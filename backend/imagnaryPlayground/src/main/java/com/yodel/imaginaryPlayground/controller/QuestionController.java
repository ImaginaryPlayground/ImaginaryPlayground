package com.yodel.imaginaryPlayground.controller;

import com.yodel.imaginaryPlayground.model.dto.AnswerDto;
import com.yodel.imaginaryPlayground.model.dto.PageDto;
import com.yodel.imaginaryPlayground.model.dto.QuestionDto;
import com.yodel.imaginaryPlayground.model.dto.UserDto;
import com.yodel.imaginaryPlayground.model.vo.DeleteVO;
import com.yodel.imaginaryPlayground.service.AdminService;
import com.yodel.imaginaryPlayground.service.AnswerService;
import com.yodel.imaginaryPlayground.service.QuestionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.models.auth.In;
import jdk.swing.interop.SwingInterOpUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Api("QuestionController V1")
@RestController
@RequestMapping("/question")
@RequiredArgsConstructor
@CrossOrigin("*")

public class QuestionController {
    private final String success = "SUCCESS"; //이 부분을 한 객체로 묶어서 사용할 수는 없을까?
    private final String fail = "FAIL";
    private final String error = "ERROR";
    private final QuestionService questionService;
    private final AnswerService answerService;

    @PostMapping("/register")
    @ApiOperation(value = "질문 등록", notes = "회원이 질문을 등록할 수 있는 기능")
    public Map<String, Object> saveQuestion(
            @RequestBody @ApiParam(value = "질문등록에 필수요소인 QuestionDTO 내용을 보낸다.", required = true) QuestionDto question){
        Map<String, Object> result = new HashMap<>();
        System.out.println(question);
        try {
            int res = questionService.saveQuestion(question);
            if(res == 1){
                result.put("status", success);
                result.put("data", questionService.lookupAllQuestion(0));
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
    @ApiOperation(value = "질문 수정", notes = "회원이 질문을 수정할 수 있는 기능")
    public Map<String, Object> editQuestion(
            @RequestBody @ApiParam(value = "질문수정에 필수요소인 QuestionDTO 내용을 보낸다.", required = true) QuestionDto question){
        Map<String, Object> result = new HashMap<>();
        try {
            if(question.getCompleted() == 1){
                result.put("status", fail);
                result.put("message", "답변이 완료된 글의 질문은 수정할 수 없습니다.");
            }else{
                int res = questionService.editQuestion(question);
                if(res == 1){
                    result.put("status", success);
                    result.put("data", questionService.lookupQuestion(question.getId()));
                }else{
                    result.put("status", fail);
                }
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        return result;
    }

    @PostMapping  ("/delete")
    @ApiOperation(value = "질문 삭제", notes = "회원이 질문을 삭제할 수 있는 기능")
    public Map<String, Object> deleteQuestion(
            @RequestBody @ApiParam(value = "질문삭제에 필요한 question의 id값과 user_id를 전송한다.", required = true)
            DeleteVO deleteVO){
        Map<String, Object> result = new HashMap<>();
        //이후 토큰의 id와 user_id값을 비교한다.
        try {
            int res = questionService.deleteQuestion(deleteVO);
            if(res == 1){
                result.put("status", success);
                result.put("data", questionService.lookupAllQuestion(0));
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
    @ApiOperation(value = "전체 질문글을 조회한다.", notes = "질문들을 모두 조회하여 가져온다.")
    public Map<String, Object> lookupAllQuestion(
            @RequestBody @ApiParam(value = "page(필수), key: 검색할 제목/내용, value: 검색값, qna_type: 유형(0이면 전체 검색)", required = false)
            PageDto pageDto){
        Map<String, Object> result = new HashMap<>();
        List<QuestionDto> questionList = new ArrayList<>();
        System.out.println(pageDto.getValue() == null);
        try {
            if(pageDto.getValue() == null || pageDto.getValue().trim() == null){ //검색값이 없는 경우
                if(pageDto.getQna_type() == 0){ //문의유형이 0인 경우
                    questionList = questionService.lookupAllQuestion(pageDto.getPage());
                }else{ //만약 문의유형이 0이 아닌 경우
                    questionList = questionService.lookupAllQuestionWithQuestionType(pageDto);
                }
            }else { //검색값이 있는 경우
                if(pageDto.getQna_type() == 0){ //문의유형이 0인 경우
                    questionList = questionService.searchAllQuestion(pageDto);
                }else{ //만약 문의유형이 0이 아닌 경우
                    questionList = questionService.searchAllQuestionWithQuestionType(pageDto);
                }
            }

            if(questionList != null){
                result.put("status", success);
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        result.put("data", questionList);
        return result;
    }

    @GetMapping("/lookup/{id}")
    @ApiOperation(value = "질문과 그에 대한 답변을 불러온다.", notes = "특정 질문글을 조회한다.")
    public Map<String, Object> lookupQuestion(@PathVariable int id){
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> data = new HashMap<>();

        QuestionDto question = new QuestionDto();
        AnswerDto answer = new AnswerDto();
        try {
            question = questionService.lookupQuestion(id);
            if(question != null){
                result.put("status", success);
                data.put("question", question);
                if(question.getCompleted() == 1){
                    answer = answerService.detailAnswer(id);
                    data.put("answer", answer);
                }
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }

        result.put("data", data);
        return result;
    }
}
