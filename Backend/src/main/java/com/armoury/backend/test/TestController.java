package com.armoury.backend.test;

import com.armoury.backend.config.BaseResponseStatus;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "Test", description = "서버 동작 테스트")
@RequestMapping("/test")
public class TestController {

    @GetMapping("/success")
    public String success(){
        return BaseResponseStatus.SUCCESS.getMessage();
    }

}
