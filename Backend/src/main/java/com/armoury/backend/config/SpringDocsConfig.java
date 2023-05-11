package com.armoury.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SpringDocsConfig {
    @Bean
    public OpenAPI openAPI() {
        Info info = new Info()
                .title("Capstone Cyber1 Project - API Document")
                .version("v0.0.1")
                .description("사이버 무기고 프로젝트의 API 명세서입니다.");
        return new OpenAPI()
                .components(new Components())
                .info(info);
    }
}
