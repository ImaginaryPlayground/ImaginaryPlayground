package com.yodel.imaginaryPlayground.service;

import com.yodel.imaginaryPlayground.mapper.UserCareMapper;
import com.yodel.imaginaryPlayground.model.dto.BabyDto;
import com.yodel.imaginaryPlayground.model.dto.ConsultDto;
import com.yodel.imaginaryPlayground.model.dto.PageDto;
import com.yodel.imaginaryPlayground.model.vo.BabyVO;
import com.yodel.imaginaryPlayground.model.vo.IdVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserCareServiceImpl implements UserCareService {

    private final UserCareMapper userCareMapper;

    @Override
    public int saveBaby(BabyDto baby) throws Exception {
        return userCareMapper.saveBaby(baby);
    }

    @Override
    public List<BabyDto> searchAllBaby(BabyVO babyVO) throws Exception {
        return userCareMapper.searchAllBaby(babyVO);
    }

    @Override
    public int searchAllBabyCount(BabyVO babyVO) throws Exception {
        return userCareMapper.searchAllBabyCount(babyVO);
    }

    @Override
    public List<BabyDto> lookupAllBaby(PageDto pageDto) throws Exception {
        return userCareMapper.lookupAllBaby(pageDto);
    }

    @Override
    public List<BabyDto> searchByKeyword(PageDto pageDto) throws Exception {
        return userCareMapper.searchByKeyword(pageDto);
    }

    @Override
    public BabyDto lookupBaby(IdVO idVO) throws Exception {
        return userCareMapper.lookupBaby(idVO);
    }

    @Override
    public BabyDto getBaby(BabyDto babyDto) throws Exception {
        return userCareMapper.getBaby(babyDto);
    }

    @Override
    public int updateBabyInfo(BabyDto baby) throws Exception {
        return userCareMapper.updateBabyInfo(baby);
    }

    @Override
    public int deleteBabyInfo(BabyDto babyDto) throws Exception {
        return userCareMapper.deleteBabyInfo(babyDto);
    }

    @Override
    public List<ConsultDto> getConsultData(IdVO idVO) throws Exception {
        return userCareMapper.getConsultData(idVO);
    }
}
