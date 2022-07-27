package com.yodel.imaginaryPlayground.mapper;

import com.yodel.imaginaryPlayground.model.dto.BabyDto;
import com.yodel.imaginaryPlayground.model.dto.ConsultDto;
import com.yodel.imaginaryPlayground.model.dto.PageDto;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Mapper
public interface UserCareMapper {
    int saveBaby(BabyDto baby) throws SQLException;
    List<BabyDto> lookupAllBaby(PageDto pageDto) throws SQLException;
    BabyDto lookupBaby(Map<String, Integer> map) throws SQLException;
    List<BabyDto> searchByKeyword(PageDto pageDto) throws SQLException;
    int updateBabyInfo(BabyDto baby) throws SQLException;
    int deleteBabyInfo(Map<String, String> map) throws SQLException;
    List<ConsultDto> getConsultData(Map<String, String> map) throws SQLException;
}
