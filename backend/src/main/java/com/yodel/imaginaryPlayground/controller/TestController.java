package com.yodel.imaginaryPlayground.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

//업로드
@RestController("/test")
public class TestController {
    @GetMapping("")
    public Map<String, Object> logout() {

        Map<String, Object> result = new HashMap<>();

        result.put("테스트", "완료");
        return result;
    }

}
