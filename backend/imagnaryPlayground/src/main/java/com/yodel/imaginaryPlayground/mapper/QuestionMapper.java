package com.yodel.imaginaryPlayground.mapper;

import com.yodel.imaginaryPlayground.model.dto.QuestionDto;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Mapper
public interface QuestionMapper {
    int saveQuestion(QuestionDto question) throws SQLException;
    int editQuestion(QuestionDto question) throws SQLException;
    int deleteQuestion(int id) throws SQLException;
    QuestionDto lookupQuestion(int id) throws SQLException;
    List<QuestionDto> lookupAllQuestion(Map<String, Integer> map) throws SQLException;
    List<QuestionDto> lookupAllQuestionWithQuestionType(Map<String, Integer> map) throws SQLException;
    List<QuestionDto> searchAllQuestion(Map<String, String> map) throws SQLException;
    List<QuestionDto> searchAllQuestionWithQuestionType(Map<String, String> map) throws SQLException;
}
