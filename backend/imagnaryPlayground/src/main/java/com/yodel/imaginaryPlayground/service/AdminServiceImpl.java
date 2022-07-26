package com.yodel.imaginaryPlayground.service;

import com.yodel.imaginaryPlayground.mapper.AdminMapper;
import com.yodel.imaginaryPlayground.model.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final AdminMapper adminMapper;
    private final int PAGE = 9; //Pagination을 위한 변수
    @Override //생성자로 만들어서 주기
    public int approveUserType(Map<String, String> map) throws Exception {
        return adminMapper.approveUserType(map);
    }

    @Override
    public List<UserDto> lookupAllUser() throws Exception {
        return adminMapper.lookupAllUser();
    }

    @Override
    public List<UserDto> lookupUnapprovedUser(int page) throws Exception {
        Map<String, Integer> map = new HashMap<>();
        map.put("page", page);
        map.put("page_last", page + PAGE);
        return adminMapper.lookupUnapprovedUser(map);
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
