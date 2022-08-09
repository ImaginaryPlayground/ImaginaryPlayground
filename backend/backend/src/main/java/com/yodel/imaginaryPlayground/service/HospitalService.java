package com.yodel.imaginaryPlayground.service;


import com.yodel.imaginaryPlayground.model.dto.HospitalDto;

import java.util.List;

public interface HospitalService {
    List<HospitalDto> searchHospital(String value) throws Exception;
    HospitalDto lookupHospital(int id) throws Exception;
}
