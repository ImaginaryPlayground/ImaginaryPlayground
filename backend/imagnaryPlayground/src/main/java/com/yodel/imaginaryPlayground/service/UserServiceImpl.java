package com.yodel.imaginaryPlayground.service;

import com.yodel.imaginaryPlayground.mapper.UserMapper;
import com.yodel.imaginaryPlayground.model.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.SQLException;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    // TODO mapper 객체 추가 필요
    // TODO 로거 사용 필요
    private final UserMapper userMapper;

    @Override
    public int saveUser(UserDto user) {
        // TODO mapper 작업 추가 필요
        // 임시적으로 sysout 사용
        System.out.println("유저 회원가입 진행!");
        System.out.println(user.toString());

        return 0;
    }

    @Override
    public boolean modifyUser(UserDto user) {
        return false;
    }

    @Override
    public boolean deleteUser(int userId) {
        return false;
    }

    @Override
    public UserDto detailUser(int userId) {
        return null;
    }

    @Override
    public int countByEmail(String email) {
        return 0;
    }

    @Override
    public UserDto findByEmail(String email) {
        return null;
    }

    @Override
    public int test() throws SQLException {
        return userMapper.test();
    }
}
