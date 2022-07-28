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
    public int updateUserInfo(UserDto user) throws Exception {
        return userMapper.updateUserInfo(user);
    }

    @Override
    public int deleteUser(int userId){
        return 0;
    }

    @Override
    public UserDto detailUser(int userId){
        return null;
    }

    @Override
    public int countByEmail(String email){
        return 0;
    }

    @Override
    public UserDto findByEmail(String email){
        return null;
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
