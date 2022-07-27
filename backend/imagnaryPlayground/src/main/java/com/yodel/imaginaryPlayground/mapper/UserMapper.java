package com.yodel.imaginaryPlayground.mapper;

import com.yodel.imaginaryPlayground.model.dto.BabyDto;
import com.yodel.imaginaryPlayground.model.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;

@Mapper
public interface UserMapper {
    public int test() throws SQLException;

    int saveUser(UserDto user) throws SQLException;
    int updateUserInfo(UserDto user) throws SQLException;
    int deleteUser(int userId) throws SQLException;
    UserDto detailUser(int userId) throws SQLException;
    // 사용자 전체 검색은 사용하지 않을 것 같아서 제외
    int countByEmail(String email) throws SQLException;
    UserDto findByEmail(String email) throws SQLException;
}
