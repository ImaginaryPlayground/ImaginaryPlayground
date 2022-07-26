package com.yodel.imaginaryPlayground.mapper;

import com.yodel.imaginaryPlayground.model.dto.AnswerDto;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Mapper
public interface AnswerMapper {
    int isCompleted(int id) throws SQLException;
    int saveAnswer(AnswerDto answer) throws SQLException;
    int editAnswer(AnswerDto answer) throws SQLException;
    int deleteAnswer(int id) throws SQLException;
    AnswerDto detailAnswer(int question_id) throws SQLException;
    List<AnswerDto> lookupUncompletedAnswer(Map<String, String> map) throws SQLException;
}
