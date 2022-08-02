package com.yodel.imaginaryPlayground.controller;

import com.yodel.imaginaryPlayground.model.dto.BabyDto;
import com.yodel.imaginaryPlayground.model.dto.ConsultDto;
import com.yodel.imaginaryPlayground.model.dto.PageDto;
import com.yodel.imaginaryPlayground.model.dto.UserDto;
import com.yodel.imaginaryPlayground.model.vo.BabyVO;
import com.yodel.imaginaryPlayground.model.vo.IdVO;
import com.yodel.imaginaryPlayground.service.UserCareService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Update;
import org.springframework.http.HttpRequest;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.*;

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

    @ApiOperation(value = "아이 등록", notes = "회원 페이지에서 아이를 등록할 수 있다.")
    @PostMapping(value="/", consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE })
    public Map<String, String> saveBaby(
            @RequestPart(value="key", required=false) BabyDto baby,
            @RequestPart(value="file", required=true) MultipartFile file, HttpServletRequest request) throws Exception {

        Map<String, String> result = new HashMap<>();

        String fileName = file.getOriginalFilename();
        System.out.println(fileName);
        System.out.println(request.getServletContext().getRealPath("/"));

        try {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmm");
            String uploadDate = simpleDateFormat.format(new Date());
            String profile = save(file, request.getServletContext().getRealPath("/"), uploadDate);


            try {
                UserDto user = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
                baby.setUser_id(user.getId());
                baby.setProfile(profile);
                int res = userCareService.saveBaby(baby);
                if (res == 1) {
                    result.put("status", success);
                } else {
                    result.put("status", fail);
                }
            } catch (Exception e) {
                result.put("status", error);
                result.put("message", e.toString());
            }
            return result;
        } catch (IllegalStateException e){
            result.put("status", error);
            result.put("message", e.toString());
            return result;
        }
    }

    @PutMapping("/")
    @ApiOperation(value = "아이 정보수정", notes = "회원 페이지에서 아이의 정보를 수정할 수 있다.")
    public Map<String, Object> updateBabyInfo(
            @RequestBody @ApiParam(value = "아이의 {id}값과 정보들을 넣어준다.", required = true) BabyDto baby){

        Map<String, Object> result = new HashMap<>();
        try {
            UserDto user = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            baby.setUser_id(user.getId());
            int res = userCareService.updateBabyInfo(baby);
            if(res == 1){
                result.put("status", success);
                IdVO idVO = new IdVO();
                idVO.setId(baby.getId());
                idVO.setUser_id(user.getId());
                result.put("data", userCareService.lookupBaby(idVO));
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
            @RequestBody @ApiParam(value = "삭제하고자하는 baby의 {id: 값}를 넣어준다.", required = true)
            BabyDto babyDto){ // 받은 후 꺼내서 token의 id값과 대조한 후 baby_id를 삭제

        Map<String, String> result = new HashMap<>();
        try {
            UserDto user = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            babyDto.setUser_id(user.getId());
            int res = userCareService.deleteBabyInfo(babyDto);
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

    @PostMapping("/lookup/all")
    @ApiOperation(value = "회원명으로 등록된 전체 아이들 조회", notes = "회원 페이지에서 전체 아이들의 정보를 조회한다.")
    public Map<String, Object> searchAllBaby(
            @RequestBody @ApiParam(value = "{page: 요청 페이지(필수), name, age_1, age_2, gender}", required = true)
            BabyVO babyVO){

        Map<String, Object> result = new HashMap<>();
        List<BabyDto> babyList = new ArrayList<>();
        int countAllBaby = 0;
        try {
            UserDto user = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            babyVO.setUser_id(user.getId());
            babyVO.setPage_last(babyVO.getPage() + PAGE);
            babyList = userCareService.searchAllBaby(babyVO);

            if(babyList != null){
                result.put("status", success);
                countAllBaby = userCareService.searchAllBabyCount(babyVO);
                result.put("searchedDataAllNum", countAllBaby);
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
            @RequestBody @ApiParam(value = "id: 조회하고자 하는 아이 식별자", required = true)
            IdVO idVO){

        Map<String, Object> result = new HashMap<>();
        BabyDto baby = new BabyDto();
        try {
            UserDto user = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            idVO.setUser_id(user.getId());
            baby = userCareService.lookupBaby(idVO);
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
            @RequestBody @ApiParam(value = "id: 조회하고자 하는 아이 식별자}", required = true)
            IdVO idVO){

        Map<String, Object> result = new HashMap<>();
        List<ConsultDto> consultList = new ArrayList<>();
        try {
            consultList = userCareService.getConsultData(idVO);
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

    private String save(MultipartFile file, String contextPath, String uploadDate) {

        try {
            String newFileName = uploadDate + file.getOriginalFilename();
            byte[] bytes = file.getBytes();
            Path path = Paths.get(contextPath + newFileName);
            Files.write(path, bytes);
            return newFileName;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}

