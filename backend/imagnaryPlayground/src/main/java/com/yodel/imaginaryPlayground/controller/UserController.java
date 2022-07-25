package com.yodel.imaginaryPlayground.controller;

import com.yodel.imaginaryPlayground.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    @GetMapping("/test")
    public void test() throws SQLException {
        int result = userService.test();
        System.out.println(result);
    }
}
