package com.yodel.imaginaryPlayground.controller;

import com.yodel.imaginaryPlayground.model.dto.BabyDto;
import com.yodel.imaginaryPlayground.model.dto.Role;
import com.yodel.imaginaryPlayground.model.dto.UserDto;
import com.yodel.imaginaryPlayground.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    private static final String success = "SUCCESS";
    private static final String fail = "FAIL";
    private static final String error = "ERROR";

    @GetMapping("/test")
    public void test() throws SQLException {
        int result = userService.test();
        System.out.println(result);
    }

    @PostMapping("/register")
    @ApiOperation(value = "회원가입", notes = "회원가입을 한다.")
    public Map<String, Object> signUp(
            @RequestBody @ApiParam(value = "필수 입력 정보를 모두 넣어준다.", required = true) Map<String, String> signupData) {
        String email = signupData.get("email");
        String username = signupData.get("username");
        String document = signupData.get("document");
        String provider = signupData.get("provider");
        if (provider == null) {
            provider = "SITE";
        }

        Map<String, Object> result = new HashMap<>();

        // 기존 사용자인지 확인(이메일 조회)
        try {
            int findUser = userService.countByEmail(email);
            if(findUser == 1) {
                result.put("status", success);
                UserDto user = new UserDto(email, username, document, provider);
                result.put("data", user);
            } else {
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("message", e.getMessage());
        }
        return result;

    }



    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "로그인을 한다.")
    public Map<String, Object> login(
            @RequestBody @ApiParam(value = "로그인 정보를 입력한다.") UserDto user) {
        Map<String, Object> result = new HashMap<>();

        try {
            int res = userService.countByEmail(user.getEmail());
            if(res == 1){
                result.put("status", success);
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        return result;
    }

    @GetMapping("/detail/{id}")
    @ApiOperation(value = "회원 정보 조회", notes = "회원 정보를 조회한다.")
    public Map<String, Object> detailUser(@PathVariable int id) {
        Map<String, Object> result = new HashMap<>();
        UserDto user = new UserDto();
        try {
            user = userService.detailUser(id);
            if(user != null){
                result.put("status", success);
                result.put("data", user);
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        result.put("data", user);
        return result;
    }

    @PutMapping("/update")
    @ApiOperation(value = "회원 정보 수정", notes = "회원 페이지에서 사용자의 정보를 수정할 수 있다.")
    public Map<String, Object> updateUserInfo(
            @RequestBody UserDto user){

        Map<String, Object> result = new HashMap<>();
        try {
            int res = userService.updateUserInfo(user);
            if(res == 1){
                result.put("status", success);
                result.put("data", userService.detailUser(user.getId()));
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }

        return result;
    }

    @DeleteMapping("/{id}")
    @ApiOperation(value = "회원 정보 삭제", notes = "회원 페이지에서 사용자의 정보를 삭제한다.")
    public Map<String, String> deleteUser(
            @PathVariable int id){

        Map<String, String> result = new HashMap<>();

        try {
            int res = userService.deleteUser(id);
            if(res == 1) {
                result.put("status", success);
            } else {
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        return result;
    }

}
