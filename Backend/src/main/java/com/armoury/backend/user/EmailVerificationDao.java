package com.armoury.backend.user;

import com.armoury.backend.user.model.EmailVerification;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

@Slf4j
@Repository
public class EmailVerificationDao {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource){
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }


    private final String SAVE_CODE = "INSERT INTO EmailVerification (email, code) VALUES (?,?)";

    private final String SELECT_CODE = "SELECT id, email, code FROM EmailVerification WHERE email = ?";

    private final String UPDATE_CODE = "UPDATE EmailVerification SET code = ? WHERE email = ?";




    // 코드 저장
    public int saveEmailVerificationCode(String email, int code) {
        Object[] params = {email, code};
        return this.jdbcTemplate.update(SAVE_CODE, params);
    }


    // 코드 중복 생성시 업데이트
    public int updateEmailVerificationCode(String email, int code) {
        Object[] params = {email, code};
        return this.jdbcTemplate.update(UPDATE_CODE, params);
    }



    public EmailVerification getEmailVerificationCode(String email) {
        Object[] params = {email};
        try {
            return this.jdbcTemplate.queryForObject(SELECT_CODE, params, (rs, rowNum) -> new EmailVerification(
                    rs.getLong("id"),
                    rs.getString("email"),
                    rs.getInt("code")
                    ));
        } catch (EmptyResultDataAccessException e) {
            log.error(e.getMessage());
            return null;
        }
    }

}
