package com.yodel.imaginaryPlayground.service;

import com.yodel.imaginaryPlayground.mapper.AdminMapper;
import com.yodel.imaginaryPlayground.model.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final AdminMapper adminMapper;

    @Override
    public int approveUserMail(String email) throws Exception {
        return adminMapper.approveUserMail(email);
    }

    @Override //생성자로 만들어서 주기
    public int approveUserType(Map<String, String> map) throws Exception {
        return adminMapper.approveUserType(map);
    }

    @Override
    public List<UserDto> lookupAllUser() throws Exception {
        return adminMapper.lookupAllUser();
    }

    @Override
    public UserDto lookupUser(String email) throws Exception {
        return adminMapper.lookupUser(email);
    }

    @Override
    public int deleteUser(String email) throws Exception {
        return adminMapper.deleteUser(email);
    }
}
