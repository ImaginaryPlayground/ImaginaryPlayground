package com.yodel.imaginaryPlayground.controller;

import com.yodel.imaginaryPlayground.model.dto.BabyDto;
import com.yodel.imaginaryPlayground.model.dto.ConsultDto;
import com.yodel.imaginaryPlayground.model.dto.PageDto;
import com.yodel.imaginaryPlayground.model.dto.UserDto;
import com.yodel.imaginaryPlayground.service.UserCareService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Update;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Api("UserCareController V1")
@RestController
@RequestMapping("/user/care")
@RequiredArgsConstructor
@CrossOrigin("*")
public class UserCareController{

    /* 유저 케어 서비스를 이용할 때마다 토큰의 있는 email과 id값과 제출하는 id값이 일치하는지 확인한다 */
    private final String success = "SUCCESS"; //이 부분을 한 객체로 묶어서 사용할 수는 없을까?
    private final String fail = "FAIL";
    private final String error = "ERROR";
    private final UserCareService userCareService;
    private final int PAGE = 9; //Pagination을 위한 변수

    @PostMapping("/")
    @ApiOperation(value = "아이 등록", notes = "회원 페이지에서 아이를 등록할 수 있다.")
    public Map<String, String> saveBaby(
            @RequestBody @ApiParam(value = "필수 회원 정보를 넣어준다.", required = true) BabyDto baby) throws Exception {

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
    @ApiOperation(value = "아이 정보수정", notes = "회원 페이지에서 아이의 정보를 수정할 수 있다.")
    public Map<String, Object> updateBabyInfo(
            @RequestBody @ApiParam(value = "변경된 이후의 회원 정보를 모두 넣어준다.", required = true) BabyDto baby){

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

        return result;
    }

    @DeleteMapping("/")
    @ApiOperation(value = "아이 정보삭제", notes = "회원 페이지에서 아이의 정보를 삭제한다.")
    public Map<String, String> deleteBabyInfo(
            @RequestBody @ApiParam(value = "삭제하는 주체인 회원의 id와 삭제하고자하는 baby_id를 넣어준다.", required = true)
            Map<String, String> map){ // 받은 후 꺼내서 token의 id값과 대조한 후 baby_id를 삭제

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

        return result;
    }

    @PostMapping("/lookup/all") // user_id와 page를 받음 -> 이후 세팅된 페이지만큼 더한 값도 map에 첨부 / key - value로 검색
    @ApiOperation(value = "회원명으로 등록된 전체 아이들 조회", notes = "회원 페이지에서 전체 아이들의 정보를 조회한다.")
    public Map<String, Object> lookupAllBaby(
            @RequestBody @ApiParam(value = "{page: 요청 페이지(필수), key: 'name/age/gender', , value: 검색 내용}", required = true)
            PageDto pageDto){

        Map<String, Object> result = new HashMap<>();
        List<BabyDto> babyList = new ArrayList<>();
        try {
            pageDto.setPage_last(pageDto.getPage() + PAGE);
            if(pageDto.getValue() == null || pageDto.getValue().trim() == null){
                babyList = userCareService.lookupAllBaby(pageDto);
            }else{
                babyList = userCareService.searchByKeyword(pageDto);
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

    @PostMapping("/lookup")
    @ApiOperation(value = "특정 아이 정보 조회", notes = "회원명으로 등록된 한 아이의 정보를 조회한다.")
    public Map<String, Object> lookupBaby(
            @RequestBody @ApiParam(value = "{id: 요청하는 회원의 식별자, baby_id: 조회하고자 하는 아이 식별자}", required = true)
            Map<String, Integer> map){

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
    @ApiOperation(value = "아이 상담 내역 불러오기", notes = "아이의 상담 데이터를 모두 불러온다.")
    public Map<String, Object> getConsultData(
            @RequestBody @ApiParam(value = "{id: 요청하는 회원의 식별자, baby_id: 조회하고자 하는 아이 식별자}", required = true)
            Map<String, String> map){

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

