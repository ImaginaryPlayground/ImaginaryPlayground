package com.yodel.imaginaryPlayground.service;

import com.yodel.imaginaryPlayground.mapper.HospitalMapper;
import com.yodel.imaginaryPlayground.model.dto.HospitalDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HospitalServiceImpl implements HospitalService{
    private final HospitalMapper hospitalMapper;
    @Override
    public List<HospitalDto> searchHospital(String value) throws Exception {
        return hospitalMapper.searchHospital(value);
    }

    @Override
    public HospitalDto lookupHospital(int id) throws Exception {
        return hospitalMapper.lookupHospital(id);
    }
}
