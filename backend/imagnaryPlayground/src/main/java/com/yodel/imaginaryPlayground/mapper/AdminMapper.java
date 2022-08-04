package com.yodel.imaginaryPlayground.mapper;

import com.yodel.imaginaryPlayground.model.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Mapper
public interface AdminMapper {
    int approveUser(List<String> list) throws SQLException;
    int deleteUser(List<String> list) throws SQLException;
    int lookupUserNumber(String type) throws SQLException;
    List<UserDto> lookupUnapprovedUser(Map<String, Integer> map) throws SQLException;
    List<UserDto> lookupApprovedUser(Map<String, Integer> map) throws SQLException;
    List<UserDto> lookupAllUser(String type) throws SQLException;
    UserDto lookupUser(String email) throws SQLException;
}
