package com.armoury.backend.config;


import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringDocsConfig {
    @Bean
    public OpenAPI openAPI() {
        Info info = new Info()
                .title("캡스톤 프로젝트 API Document")
                .version("1.0.0")
                .description("Cyber1 - 사이버 무기고 프로젝트");
        return new OpenAPI()
                .components(new Components().addSecuritySchemes("JWT",
                        new SecurityScheme().type(SecurityScheme.Type.APIKEY).in(SecurityScheme.In.HEADER).name("X-ACCESS-TOKEN")))
                .info(info)
                .addSecurityItem(new SecurityRequirement().addList("JWT"));
    }
}
