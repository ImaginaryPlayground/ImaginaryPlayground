package com.yodel.imaginaryPlayground.service;

import com.yodel.imaginaryPlayground.mapper.UserCareMapper;
import com.yodel.imaginaryPlayground.model.dto.BabyDto;
import com.yodel.imaginaryPlayground.model.dto.ConsultDto;
import com.yodel.imaginaryPlayground.model.dto.PageDto;
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
    public List<BabyDto> lookupAllBaby(PageDto pageDto) throws Exception {
        return userCareMapper.lookupAllBaby(pageDto);
    }

    @Override
    public List<BabyDto> searchByKeyword(PageDto pageDto) throws Exception {
        return userCareMapper.searchByKeyword(pageDto);
    }

    @Override
    public BabyDto lookupBaby(Map<String, Integer> map) throws Exception {
        return userCareMapper.lookupBaby(map);
    }

    @Override
    public int updateBabyInfo(BabyDto baby) throws Exception {
        return userCareMapper.updateBabyInfo(baby);
    }

    @Override
    public int deleteBabyInfo(Map<String, String> map) throws Exception {
        return userCareMapper.deleteBabyInfo(map);
    }

    @Override
    public List<ConsultDto> getConsultData(Map<String, String> map) throws Exception {
        return userCareMapper.getConsultData(map);
    }
}
