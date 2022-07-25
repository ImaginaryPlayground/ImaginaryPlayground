package com.yodel.imaginaryPlayground.controller;

import com.yodel.imaginaryPlayground.model.dto.BabyDto;
import com.yodel.imaginaryPlayground.model.dto.ConsultDto;
import com.yodel.imaginaryPlayground.model.dto.UserDto;
import com.yodel.imaginaryPlayground.service.UserCareService;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Update;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user/care")
@RequiredArgsConstructor
public class UserCareController{

    /* 유저 케어 서비스를 이용할 때마다 토큰의 있는 email과 id값과 제출하는 id값이 일치하는지 확인한다 */
    private final String success = "SUCCESS"; //이 부분을 한 객체로 묶어서 사용할 수는 없을까?
    private final String fail = "FAIL";
    private final String error = "ERROR";
    private final UserCareService userCareService;
    private final int PAGE = 9; //Pagination을 위한 변수

    @PostMapping("/") //아이 등록
    public Map<String, String> saveBaby(@RequestBody BabyDto baby) throws Exception {
        Map<String, String> result = new HashMap<>();

        try {
            int res = userCareService.saveBaby(baby);
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

    @PutMapping("/")
    public Map<String, Object> updateBabyInfo(@RequestBody BabyDto baby){
        Map<String, Object> result = new HashMap<>();
        try {
            int res = userCareService.updateBabyInfo(baby);
            if(res == 1){
                result.put("status", success);
                Map<String, Integer> map = new HashMap<>();
                map.put("user_id", baby.getUser_id());
                map.put("id", baby.getId());
                result.put("data", userCareService.lookupBaby(map));
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        //result.put("data", userCareService.lookupBaby(map.get(""))); : 프론트와 합의 후 자료 던지기
        return result;
    }

    @DeleteMapping("/") // 삭제하고자 하는 baby의 id 적어주기
    public Map<String, String> deleteBabyInfo(Map<String, String> map){ // 꺼내서 토큰의 id값과 일치 검사
        Map<String, String> result = new HashMap<>();
        try {
            int res = userCareService.deleteBabyInfo(map);
            if(res == 1){
                result.put("status", success);
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        //result.put("data", userCareService.lookupBaby(map.get(""))); : 프론트와 합의 후 자료 던지기
        return result;
    }

    @PostMapping("/lookup/all") // user_id와 page를 받음 -> 이후 세팅된 페이지만큼 더한 값도 map에 첨부 / key - value로 검색
    public Map<String, Object> lookupAllBaby(@RequestBody Map<String, String> map){
        //key, value값이 존재하는지 확인, 만약 존재하면 그것으로 검색을 진행한다.
        Map<String, Object> result = new HashMap<>();
        List<BabyDto> babyList = new ArrayList<>();
        try {
            map.put("page_last", map.get("page") + PAGE);
            if(map.get("value") == null || map.get("value").trim() == null){
                babyList = userCareService.lookupAllBaby(map);
            }else{
                babyList = userCareService.searchByKeyword(map);
            }

            if(babyList != null){
                result.put("status", success);
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        result.put("data", babyList);
        return result;
    }

    @PostMapping("/lookup") //user_id와 아이의 id를 보낼 것
    public Map<String, Object> lookupBaby(@RequestBody Map<String, Integer> map){
        Map<String, Object> result = new HashMap<>();
        BabyDto baby = new BabyDto();
        try {
            baby = userCareService.lookupBaby(map);
            if(baby != null){
                result.put("status", success);
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        result.put("data", baby);
        return result;
    }

    @PostMapping("/data/consult")
    public Map<String, Object> getConsultData(Map<String, String> map){
        Map<String, Object> result = new HashMap<>();
        List<ConsultDto> consultList = new ArrayList<>();
        try {
            consultList = userCareService.getConsultData(map);
            if(consultList != null){
                result.put("status", success);
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        result.put("data", consultList);
        return result;
    }

}

