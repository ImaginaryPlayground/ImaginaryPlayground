package com.yodel.imaginaryPlayground.service;

import com.yodel.imaginaryPlayground.model.dto.UserDto;

import java.sql.SQLException;

public interface UserService {

    public int saveUser(UserDto user);
    public boolean modifyUser(UserDto user);
    public boolean deleteUser(int userId);
    public UserDto detailUser(int userId);
    // 사용자 전체 검색은 사용하지 않을 것 같아서 제외
    public int countByEmail(String email);
    public UserDto findByEmail(String email);

    public int test() throws SQLException;
}
