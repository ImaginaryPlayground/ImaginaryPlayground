package com.yodel.imaginaryPlayground.service;

import com.yodel.imaginaryPlayground.model.dto.PageDto;
import com.yodel.imaginaryPlayground.model.dto.QuestionDto;
import com.yodel.imaginaryPlayground.model.vo.DeleteVO;

import java.util.List;
import java.util.Map;

public interface QuestionService {
    int saveQuestion(QuestionDto question) throws Exception;
    int editQuestion(QuestionDto question) throws Exception;
    int deleteQuestion(DeleteVO deleteVO) throws Exception;
    QuestionDto lookupQuestion(int id) throws Exception;
    List<QuestionDto> lookupAllQuestion(int page) throws Exception;
    List<QuestionDto> lookupAllQuestionWithQuestionType(PageDto pageDto) throws Exception;
    List<QuestionDto> searchAllQuestion(PageDto pageDto) throws Exception;
    List<QuestionDto> searchAllQuestionWithQuestionType(PageDto pageDto) throws Exception;
}
