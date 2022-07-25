package com.yodel.imaginaryPlayground.controller;

import com.yodel.imaginaryPlayground.model.dto.UserDto;
import com.yodel.imaginaryPlayground.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final String success = "SUCCESS"; //이 부분을 한 객체로 묶어서 사용할 수는 없을까?
    private final String fail = "FAIL";
    private final String error = "ERROR";
    private final AdminService adminService;
    @PostMapping("/auth/mail")
    public Map<String, String> approveUserMail(@RequestBody String email){
        Map<String, String> result = new HashMap<>();
        try {
            int res = adminService.approveUserMail(email);
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

    @PostMapping("/auth/type")
    public Map<String, Object> approveUserType(@RequestBody Map<String, String> map){
        Map<String, Object> result = new HashMap<>();
        try {
            int res = adminService.approveUserType(map);
            if(res == 1){
                result.put("status", success);
                result.put("data", adminService.lookupUser(map.get("email")));
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        return result;
    }

    @GetMapping("/lookup/all")
    public Map<String, Object> lookupAllUser(){
        Map<String, Object> result = new HashMap<>();
        List<UserDto> userList = new ArrayList<>();
        try {
            userList = adminService.lookupAllUser();
            if(userList != null){
                result.put("status", success);
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        result.put("data", userList);
        return result;
    }

    @PostMapping("/lookup")
    public Map<String, Object> lookupUser(@RequestBody String email){
        Map<String, Object> result = new HashMap<>();
        UserDto user = new UserDto();
        try {
            user = adminService.lookupUser(email);
            if(user != null){
                result.put("status", success);
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

    @PostMapping("/delete")
    public Map<String, String> deleteUser(@RequestBody String email){
        Map<String, String> result = new HashMap<>();
        try {
            int res = adminService.deleteUser(email);
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


}
