package com.yodel.imaginaryPlayground.service;

import com.yodel.imaginaryPlayground.model.dto.BabyDto;
import com.yodel.imaginaryPlayground.model.dto.ConsultDto;
import com.yodel.imaginaryPlayground.model.dto.PageDto;
import com.yodel.imaginaryPlayground.model.vo.BabyVO;
import com.yodel.imaginaryPlayground.model.vo.IdVO;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface UserCareService {
    int saveBaby(BabyDto baby) throws Exception;
    List<BabyDto> searchAllBaby(BabyVO babyVO) throws Exception;
    int searchAllBabyCount(BabyVO babyVO) throws Exception;
    List<BabyDto> lookupAllBaby(PageDto pageDto) throws Exception;
    List<BabyDto> searchByKeyword(PageDto pageDto) throws Exception;
    BabyDto lookupBaby(IdVO idVO) throws Exception;
    int updateBabyInfo(BabyDto baby) throws Exception;

    int deleteBabyInfo(BabyDto babyDto) throws Exception;
    List<ConsultDto> getConsultData(IdVO idVO) throws Exception;

}
