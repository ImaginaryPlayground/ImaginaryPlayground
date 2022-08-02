package com.yodel.imaginaryPlayground.mapper;

import com.yodel.imaginaryPlayground.model.dto.BabyDto;
import com.yodel.imaginaryPlayground.model.dto.ConsultDto;
import com.yodel.imaginaryPlayground.model.dto.PageDto;
import com.yodel.imaginaryPlayground.model.vo.BabyVO;
import com.yodel.imaginaryPlayground.model.vo.IdVO;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Mapper
public interface UserCareMapper {
    int saveBaby(BabyDto baby) throws SQLException;
    List<BabyDto> searchAllBaby(BabyVO babyVO) throws SQLException;
    int searchAllBabyCount(BabyVO babyVO) throws SQLException;
    List<BabyDto> lookupAllBaby(PageDto pageDto) throws SQLException;
    BabyDto lookupBaby(IdVO idVO) throws SQLException;
    List<BabyDto> searchByKeyword(PageDto pageDto) throws SQLException;
    int updateBabyInfo(BabyDto baby) throws SQLException;
    int deleteBabyInfo(BabyDto babyDto) throws SQLException;
    List<ConsultDto> getConsultData(IdVO idVO) throws SQLException;
}
