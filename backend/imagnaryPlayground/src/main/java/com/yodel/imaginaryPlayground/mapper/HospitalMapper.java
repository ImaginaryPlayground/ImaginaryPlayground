package com.yodel.imaginaryPlayground.mapper;

import com.yodel.imaginaryPlayground.model.dto.HospitalDto;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;
import java.util.List;

@Mapper
public interface HospitalMapper {
    List<HospitalDto> searchHospital(String value) throws SQLException;
    HospitalDto lookupHospital(int id) throws SQLException;
}
