package com.yodel.imaginaryPlayground.service;

import com.yodel.imaginaryPlayground.mapper.AnswerMapper;
import com.yodel.imaginaryPlayground.model.dto.AnswerDto;

import java.util.List;
import java.util.Map;

public interface AnswerService {
    int isCompleted(int id) throws Exception;
    int saveAnswer(AnswerDto answer) throws Exception;
    int editAnswer(AnswerDto answer) throws Exception;
    int deleteAnswer(int id) throws Exception;
    AnswerDto detailAnswer(int question_id) throws Exception;
    List<AnswerDto> lookupUncompletedAnswer(Map<String, String> map) throws Exception;
 }
