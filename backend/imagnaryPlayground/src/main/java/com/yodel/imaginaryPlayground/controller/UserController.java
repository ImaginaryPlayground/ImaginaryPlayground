package com.yodel.imaginaryPlayground.controller;

import com.yodel.imaginaryPlayground.model.dto.UserDto;
import com.yodel.imaginaryPlayground.model.jwt.JwtTokenService;
import com.yodel.imaginaryPlayground.model.vo.EmailCodeVO;
import com.yodel.imaginaryPlayground.service.EmailService;
import com.yodel.imaginaryPlayground.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final EmailService emailService;

    private final JwtTokenService jwtTokenService;
    private final PasswordEncoder passwordEncoder;

    private static final String success = "SUCCESS";
    private static final String fail = "FAIL";
    private static final String error = "ERROR";

    @PostMapping("/register")
    @ApiOperation(value = "회원가입", notes = "회원가입을 한다.")
    public Map<String, Object> signUp(
            @RequestBody @ApiParam(value = "필수 입력 정보를 모두 넣어준다.", required = true) Map<String, String> signupData) {
        String email = signupData.get("email");
        String username = signupData.get("username");
        String provider = "SITE";

        Map<String, Object> result = new HashMap<>();

        // 기존 사용자인지 확인(이메일 조회)
        try {
            int findUser = userService.countByEmail(email);
            if(findUser == 1) {     // 이미 존재하는 이메일
                result.put("status", fail);
                UserDto user = new UserDto(email, username, provider);

                userService.saveUser(user);
                //이메일 인증 구현

                result.put("data", user);
            } else {
                result.put("status", success);
            }
        } catch (Exception e) {
            result.put("error", error);
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
                //공통으로 토큰이 들어간다(로그인 성공시 따로 넣어준다).
                String token = jwtTokenService.createToken(user.getEmail(), user.getType());
                result.put("data", token);
                result.put("status", success);
            }else{
                // 실패했을 때 사용자 정보?
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

    @PostMapping("/authEmail/send")
    public Map<String, Object> sendEmail(@RequestBody String email){
        Map<String, Object> result = new HashMap<>();
        System.out.println("이메일 인증 진행 :"+ email);

        //먼저 관련 email 인증을 삭제한다
        userService.deleteEmailCode(email);

        final int CODE = (int) ( 100000 + Math.random()*899999); //임의의 6자리 코드 생성

        if(emailService.sendEmail( email // 메일 인증 성공
                , "[상상놀이터] 이메일 인증 안내"
                , "인증코드는 [ "+CODE+" ] 입니다.").get("status").equals(success)){
            int res = userService.saveEmailAuth(email, Integer.toString(CODE));
            if(res == 1){
                result.put("status", success);
            }else{
                result.put("status", error);
            }
        }else{
            // 메일 인증 실패
            result.put("status", fail);
        }

        return result;
    }

    @PostMapping("/authEmail/receive")
    public Map<String, Object> authEmailCode(@RequestBody EmailCodeVO emailCodeVO){
        Map<String, Object> result = new HashMap<>();
        System.out.println("이메일 코드 일치 여부 확인 :"+ emailCodeVO);

        String msg = "";
        int res = userService.authEmailCode(emailCodeVO);

        if(res == 1){
            result.put("status", success);
            result.put("message", "이메일 인증에 성공했습니다.");
            userService.deleteEmailCode(emailCodeVO.getEmail());
        }else{
            result.put("status", fail);
            result.put("message", "이메일 인증에 실패했습니다.");
        }
        return result;
    }

    @PostMapping("/token")
    public Map<String, Object> parseToken(@RequestBody String token){
        Map<String, Object> result = new HashMap<>();
        System.out.println("들어왔냐");
        System.out.println(SecurityContextHolder.getContext());
        //UserDto user2 = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        //System.out.println("login Service :" + user2.toString());

        return result;
    }
}
