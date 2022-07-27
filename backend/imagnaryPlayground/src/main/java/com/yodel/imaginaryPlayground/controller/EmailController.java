package com.yodel.imaginaryPlayground.controller;

import com.yodel.imaginaryPlayground.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
public class EmailController {

    private final EmailService emailService;

    @PostMapping("AUTH.SEND_EMAIL")
    public Map<String, Object> sendEmail(@RequestBody Map<String, Object> params){
        log.info("email params={}", params);

        return emailService.sendEmail( (String) params.get("hmr971127@gmail.com")
                , (String) params.get("메일 인증 테스트")
                , (String) params.get("메일 인증 테스트입니다.")
        );
    }
}
