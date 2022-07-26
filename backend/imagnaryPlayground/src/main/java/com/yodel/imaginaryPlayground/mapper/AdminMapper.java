package com.yodel.imaginaryPlayground.mapper;

import com.yodel.imaginaryPlayground.model.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Mapper
public interface AdminMapper {
    int approveUserType(Map<String, String> map) throws SQLException;
    List<UserDto> lookupAllUser() throws SQLException;
    List<UserDto> lookupUnapprovedUser(Map<String, Integer> map) throws SQLException;
    UserDto lookupUser(String email) throws SQLException;
    int deleteUser(String email) throws SQLException;
}
