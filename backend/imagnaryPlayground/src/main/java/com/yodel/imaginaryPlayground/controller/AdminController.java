package com.yodel.imaginaryPlayground.controller;

import com.yodel.imaginaryPlayground.model.dto.UserDto;
import com.yodel.imaginaryPlayground.service.AdminService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Api("AdminController V1")
@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AdminController {

    private final String success = "SUCCESS"; //이 부분을 한 객체로 묶어서 사용할 수는 없을까?
    private final String fail = "FAIL";
    private final String error = "ERROR";
    private final AdminService adminService;

    @PostMapping("/auth")
    @ApiOperation(value = "정회원 등록", notes = "이메일 인증이 완료된 회원이 사이트를 이용할 수 있도록 정회원으로 승인한다.")
    public Map<String, Object> approveUserType(
            @RequestParam(value="user[]") @ApiParam(value = "email 값을 user 이름의 배열을 통해 보내준다.", required = true) List<Integer> list){
        Map<String, Object> result = new HashMap<>();
        try {
            int res = adminService.approveUser(list);
            if(res == 1){
                result.put("status", success);
                result.put("data", adminService.lookupUnapprovedUser(0));
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        return result;
    }

    @PostMapping("/delete")
    @ApiOperation(value = "회원 삭제", notes = "관리자 페이지에서 등록된 회원을 삭제한다.")
    public Map<String, String> deleteUser(
            @RequestParam(value="user[]") @ApiParam(value = "email 값을 user 이름의 배열을 통해 보내준다.", required = true) List<Integer> list){
        Map<String, String> result = new HashMap<>();
        try {
            int res = adminService.deleteUser(list);
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

    @GetMapping("/lookup/unapproved/{page}")
    @ApiOperation(value = "승인이 필요한 회원 전체 조회", notes = "관리자 페이지에서 승인을 기다리는 회원 모두를 조회한다.")
    public Map<String, Object> lookupUnapprovedUser(@PathVariable int page){
        Map<String, Object> result = new HashMap<>();
        List<UserDto> userList = new ArrayList<>();
        try {
            userList = adminService.lookupUnapprovedUser(page);
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

    @GetMapping("/lookup/approved/{page}")
    @ApiOperation(value = "승인이 완료된 회원 전체 조회", notes = "관리자 페이지에서 승인을 받은 회원 모두를 조회한다.")
    public Map<String, Object> lookupApprovedUser(@PathVariable int page){
        Map<String, Object> result = new HashMap<>();
        List<UserDto> userList = new ArrayList<>();
        try {
            userList = adminService.lookupApprovedUser(page);
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

    @GetMapping("/lookup/all/{mode}")
    @ApiOperation(value = "전체 회원 조회/미승인 회원 전체 조회/승인 회원 전체 조회", notes = "관리자 페이지에서 특정 회원들의 정보를 전체조회한다.")
    public Map<String, Object> lookupAllUser(
            @PathVariable @ApiParam(value = "[0]: 전체 회원 조회, [1] 승인된 회원 조회, [2] 미승인 회원 조회", required = true) int mode){
        Map<String, Object> result = new HashMap<>();
        List<UserDto> userList = new ArrayList<>();
        try {
            userList = adminService.lookupAllUser(mode);
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

    @GetMapping("/lookup/number/{isApproved}")
    @ApiOperation(value = "특정 회원의 수 조회", notes = "관리자 페이지에서 승인된/승인되지 않은 회원 숫자를 조회한다.")
    public Map<String, Object> lookupUserNumber(@PathVariable boolean isApproved){
        Map<String, Object> result = new HashMap<>();
        int res = 0;
        try {
            res = adminService.lookupUserNumber(isApproved);
            if(res != 0){
                result.put("status", success);
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        result.put("data", res);
        return result;
    }

    @PostMapping("/lookup")
    @ApiOperation(value = "특정 회원 조회", notes = "관리자 페이지에서 특정 회원의 상세정보를 조회한다.")
    public Map<String, Object> lookupUser(
            @RequestBody @ApiParam(value = "조회에 필요한 이메일 주소", required = true) String email){
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

}
