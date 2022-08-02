package com.yodel.imaginaryPlayground.service;

import com.yodel.imaginaryPlayground.model.dto.AnswerDto;
import com.yodel.imaginaryPlayground.model.dto.PageDto;
import com.yodel.imaginaryPlayground.model.vo.IdVO;

import java.util.List;

public interface AnswerService {
    Integer isCompleted(int id) throws Exception;
    int saveAnswer(AnswerDto answer) throws Exception;
    int checkCompleted(int question_id) throws Exception;
    int editAnswer(AnswerDto answer) throws Exception;
    int deleteAnswer(IdVO idVO) throws Exception;
    AnswerDto detailAnswer(int question_id) throws Exception;
    List<AnswerDto> lookupUncompletedAnswer(PageDto pageDto) throws Exception;
 }
