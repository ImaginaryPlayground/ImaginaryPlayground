package com.yodel.imaginaryPlayground.service;

import com.yodel.imaginaryPlayground.model.dto.UserDto;

import java.sql.SQLException;

public interface UserService {

    int saveUser(UserDto user);
    int updateUserInfo(UserDto user) throws Exception;
    int deleteUser(int userId);
    UserDto detailUser(int userId);
    // 사용자 전체 검색은 사용하지 않을 것 같아서 제외
    int countByEmail(String email);
    UserDto findByEmail(String email);

    int test() throws SQLException;
}
