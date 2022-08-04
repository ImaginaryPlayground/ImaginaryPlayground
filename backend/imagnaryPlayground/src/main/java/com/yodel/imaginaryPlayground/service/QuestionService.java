package com.yodel.imaginaryPlayground.service;

import com.yodel.imaginaryPlayground.model.dto.PageDto;
import com.yodel.imaginaryPlayground.model.dto.QuestionDto;
import com.yodel.imaginaryPlayground.model.vo.IdVO;

import java.util.List;

public interface QuestionService {
    int saveQuestion(QuestionDto question) throws Exception;
    int editQuestion(QuestionDto question) throws Exception;
    int deleteQuestion(IdVO idVO) throws Exception;
    QuestionDto lookupQuestion(int id) throws Exception;
    QuestionDto detailQuestion(QuestionDto questionDto) throws Exception;
    List<QuestionDto> lookupAllQuestion(int page) throws Exception;
    List<QuestionDto> lookAllQuestion() throws Exception;
    int lookupAllQuestionCount(PageDto pageDto) throws Exception;
    List<QuestionDto> lookupAllQuestionWithEmail(PageDto pageDto) throws Exception;
    int lookupAllQuestionWithEmailCount(PageDto pageDto) throws Exception;
    List<QuestionDto> searchAllQuestion(PageDto pageDto) throws Exception;
    int searchAllQuestionCount(PageDto pageDto) throws Exception;
    List<QuestionDto> searchAllQuestionWithEmail(PageDto pageDto) throws Exception;
    int searchAllQuestionWithEmailCount(PageDto pageDto) throws Exception;
}
