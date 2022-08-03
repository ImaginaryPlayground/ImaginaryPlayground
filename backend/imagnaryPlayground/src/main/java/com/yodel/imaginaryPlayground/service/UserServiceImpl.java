package com.yodel.imaginaryPlayground.service;

import com.yodel.imaginaryPlayground.mapper.UserMapper;
import com.yodel.imaginaryPlayground.model.dto.UserDto;
import com.yodel.imaginaryPlayground.model.vo.EmailCodeVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserMapper userMapper;

    @Override
    public int saveUser(UserDto user) {
        // 임시적으로 sysout 사용
        System.out.println("유저 회원가입 진행!");
        System.out.println(user.toString());

        return userMapper.saveUser(user);
    }

    @Override
    public int updateUserInfo(String username) throws Exception {
        return userMapper.updateUserInfo(username);
    }

    @Override
    public UserDto detailUser(int userId) throws Exception {
        return userMapper.detailUser(userId);
    }

    @Override
    public int deleteUser(int userId) throws Exception {
        return userMapper.deleteUser(userId);
    }

    @Override
    public int countByEmail(String email) {
        return userMapper.countByEmail(email);
    }

    @Override
    public UserDto findByEmail(String email) {
        return userMapper.findByEmail(email);
    }

    @Override
    public int saveFile(String document, String email) {
        Map<String, String> map = new HashMap<>();
        map.put("document", document);
        map.put("email", email);
        return userMapper.saveFile(map);
    }

    @Override
    public int saveEmailAuth(String email, String CODE) {
        Map<String, String> map = new HashMap<>();
        map.put("email", email);
        map.put("CODE", CODE);
        return userMapper.saveEmailAuth(map);
    }

    @Override
    public int authEmailCode(EmailCodeVO emailCodeVO) {
        return userMapper.authEmailCode(emailCodeVO);
    }

    @Override
    public int deleteEmailCode(String email) {
        return userMapper.deleteEmailCode(email);
    }

}
