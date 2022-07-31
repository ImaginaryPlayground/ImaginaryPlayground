package com.yodel.imaginaryPlayground.service;

import com.yodel.imaginaryPlayground.mapper.AnswerMapper;
import com.yodel.imaginaryPlayground.model.dto.AnswerDto;
import com.yodel.imaginaryPlayground.model.dto.PageDto;
import com.yodel.imaginaryPlayground.model.vo.DeleteVO;

import java.util.List;
import java.util.Map;

public interface AnswerService {
    Integer isCompleted(int id) throws Exception;
    int saveAnswer(AnswerDto answer) throws Exception;
    int checkCompleted(int question_id) throws Exception;
    int editAnswer(AnswerDto answer) throws Exception;
    int deleteAnswer(DeleteVO deleteVO) throws Exception;
    AnswerDto detailAnswer(int question_id) throws Exception;
    List<AnswerDto> lookupUncompletedAnswer(PageDto pageDto) throws Exception;
 }
