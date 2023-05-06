package com.armoury.backend.user;


import com.armoury.backend.user.model.EmailVerification;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.util.StringUtils;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

@Getter
@Setter
@Slf4j
@Service
public class EmailVerificationService {

    @Autowired
    private EmailVerificationDao emailVerificationDao;

    @Autowired
    private JavaMailSender emailSender;



    public void sendCode(String email) {
        int code = createCode();

        if (emailVerificationDao.getEmailVerificationCode(email) == null) {
            emailVerificationDao.saveEmailVerificationCode(email, code);
        } else {
            emailVerificationDao.updateEmailVerificationCode(email, code);
        }


        // email 을 보낸다
        sendEmail(email, code);
        log.info("email["+ email + "] 에 인증코드를 발송하였습니다");

    }

    public boolean checkVerificationCode(String email, int code) {
        EmailVerification emailVerification = emailVerificationDao.getEmailVerificationCode(email);

        if (emailVerification == null) {
            return false;
        }

        if (StringUtils.equals(emailVerification.getCode(), code)) {
            return true;
        }
        return false;
    }





    private MimeMessage sendEmail(String email, int code) {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper;
        try {
            helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setSubject("파이팅 해야지 조의 프로젝트 회원가입 인증 코드 입니다");
            helper.setTo(email);
            helper.setFrom("xown0122@naver.com");

            HashMap<String, String> emailValues = new HashMap<>();
            emailValues.put("code", String.valueOf(code));


            helper.setText(makeEmailText(code), true);

            return message;
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

    }



    private String makeEmailText(int code) {
        ClassPathResource resource = new ClassPathResource("emailVerificationForm.html");

        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new InputStreamReader(resource.getInputStream()));
        } catch (IOException e) {

            throw new RuntimeException(e);
        }

        
        try {
            List<String> lines = reader.lines().collect(Collectors.toList());
            String joinedLines = String.join("\t", lines);
            return joinedLines.replace("emailVerificationCode", String.valueOf(code));
        } finally {
            try {
                reader.close();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }



    private int createCode() {
        Random random = new Random();
        return random.nextInt(9000) + 1000;
    }

}
