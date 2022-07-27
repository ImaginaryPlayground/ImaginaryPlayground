package com.yodel.imaginaryPlayground.mapper;

import com.yodel.imaginaryPlayground.model.dto.AnswerDto;
import com.yodel.imaginaryPlayground.model.dto.PageDto;
import com.yodel.imaginaryPlayground.model.vo.DeleteVO;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Mapper
public interface AnswerMapper {
    Integer isCompleted(int id) throws SQLException;
    int saveAnswer(AnswerDto answer) throws SQLException;
    int checkCompleted(int question_id) throws Exception;
    int editAnswer(AnswerDto answer) throws SQLException;
    int deleteAnswer(DeleteVO deleteVO) throws SQLException;
    AnswerDto detailAnswer(int question_id) throws SQLException;
    List<AnswerDto> lookupUncompletedAnswer(PageDto pageDto) throws SQLException;
}
