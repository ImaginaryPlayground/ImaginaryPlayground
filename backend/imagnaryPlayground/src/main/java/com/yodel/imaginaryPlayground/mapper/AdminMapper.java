package com.yodel.imaginaryPlayground.mapper;

import com.yodel.imaginaryPlayground.model.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Mapper
public interface AdminMapper {
    int approveUserMail(String email) throws SQLException;
    int approveUserType(Map<String, String> map) throws SQLException;
    List<UserDto> lookupAllUser() throws SQLException;
    UserDto lookupUser(String email) throws SQLException;
    int deleteUser(String email) throws SQLException;
}
