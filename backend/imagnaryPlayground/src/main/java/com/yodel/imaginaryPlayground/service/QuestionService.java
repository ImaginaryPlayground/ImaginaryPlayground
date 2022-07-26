package com.yodel.imaginaryPlayground.service;

import com.yodel.imaginaryPlayground.model.dto.QuestionDto;

import java.util.List;
import java.util.Map;

public interface QuestionService {
    int saveQuestion(QuestionDto question) throws Exception;
    int editQuestion(QuestionDto question) throws Exception;
    int deleteQuestion(int id) throws Exception;
    QuestionDto lookupQuestion(int id) throws Exception;
    List<QuestionDto> lookupAllQuestion(int page) throws Exception;
    List<QuestionDto> lookupAllQuestionWithQuestionType(int page, int qna_type) throws Exception;
    List<QuestionDto> searchAllQuestion(Map<String, String> map) throws Exception;
    List<QuestionDto> searchAllQuestionWithQuestionType(Map<String, String> map) throws Exception;
}
