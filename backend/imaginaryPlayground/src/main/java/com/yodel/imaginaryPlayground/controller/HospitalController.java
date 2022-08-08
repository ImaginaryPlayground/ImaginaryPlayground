package com.yodel.imaginaryPlayground.controller;


import com.yodel.imaginaryPlayground.model.dto.HospitalDto;
import com.yodel.imaginaryPlayground.model.dto.QuestionDto;
import com.yodel.imaginaryPlayground.service.AnswerService;
import com.yodel.imaginaryPlayground.service.HospitalService;
import com.yodel.imaginaryPlayground.service.QuestionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Api("HospitalController V1")
@RestController
@RequestMapping("/hospital")
@RequiredArgsConstructor
@CrossOrigin("*")
public class HospitalController {
    private final String success = "SUCCESS"; //이 부분을 한 객체로 묶어서 사용할 수는 없을까?
    private final String fail = "FAIL";
    private final String error = "ERROR";
    private final HospitalService hospitalService;

    @GetMapping("/{value}")
    @ApiOperation(value = "병원 좌표 검색", notes = "병원의 좌표를 검색할 수 있는 기능")
    public Map<String, Object> searchHospital(
            @PathVariable @ApiParam(value = "검색어에 맞는 병원을 불러온다.", required = true) String value){
        Map<String, Object> result = new HashMap<>();
        System.out.println(value);
        List<HospitalDto> hospitalList = new ArrayList<>();
        try {
            hospitalList = hospitalService.searchHospital(value);
            if(hospitalList != null){
                result.put("status", success);
                result.put("data", hospitalList);
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        return result;
    }

    @GetMapping("/lookup/{id}")
    @ApiOperation(value = "특정 병원 검색", notes = "병원의 식별자를 이용해 특정 병원을 검색할 수 있는 기능")
    public Map<String, Object> lookupHospital(
            @PathVariable @ApiParam(value = "병원 식별자에 맞는 병원 정보를 불러온다.", required = true) int id){
        Map<String, Object> result = new HashMap<>();
        try {
            HospitalDto hospitalDto = hospitalService.lookupHospital(id);
            if(hospitalDto != null){
                result.put("status", success);
                result.put("data", hospitalDto);
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
