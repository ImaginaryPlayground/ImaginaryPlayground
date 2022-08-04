package com.yodel.imaginaryPlayground.mapper;

import com.yodel.imaginaryPlayground.model.dto.PageDto;
import com.yodel.imaginaryPlayground.model.dto.QuestionDto;
import com.yodel.imaginaryPlayground.model.vo.IdVO;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;
import java.util.List;

@Mapper
public interface QuestionMapper {
    int saveQuestion(QuestionDto question) throws SQLException;
    int editQuestion(QuestionDto question) throws SQLException;
    int deleteQuestion(IdVO idVO) throws SQLException;
    QuestionDto lookupQuestion(int id) throws SQLException;
    QuestionDto detailQuestion(QuestionDto questionDto) throws SQLException;
    List<QuestionDto> lookupAllQuestion(PageDto pageDto) throws SQLException;
    int lookupAllQuestionCount(PageDto pageDto) throws SQLException;
    List<QuestionDto> lookupAllQuestionWithEmail(PageDto pageDto) throws SQLException;
    int lookupAllQuestionWithEmailCount(PageDto pageDto) throws SQLException;
    List<QuestionDto> searchAllQuestion(PageDto pageDto) throws SQLException;
    int searchAllQuestionCount(PageDto pageDto) throws SQLException;
    List<QuestionDto> searchAllQuestionWithEmail(PageDto pageDto) throws SQLException;
    int searchAllQuestionWithEmailCount(PageDto pageDto) throws Exception;
}
