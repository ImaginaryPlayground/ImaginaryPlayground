package com.yodel.imaginaryPlayground.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration //Cors 세팅을 위한 인터셉터입니다.
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:80","https://localhost:80",
                        "http://localhost:3000", "https://localhost:3000", "https://i7d204.p.ssafy.io")
                .allowedMethods("*");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/image_view/**")
                .addResourceLocations("file:"); //리눅스 root에서 시작하는 폴더 경로
    }
}
