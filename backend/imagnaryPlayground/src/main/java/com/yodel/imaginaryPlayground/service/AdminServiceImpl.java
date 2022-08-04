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
    public int approveUser(List<String> list) throws Exception {
        return adminMapper.approveUser(list);
    }

    @Override
    public int deleteUser(List<String> list) throws Exception {
        return adminMapper.deleteUser(list);
    }

    @Override
    public int lookupUserNumber(int mode) throws Exception {
        String type;
        if(mode == 1){ //승인 조회
            type = "ROLE_USER";
        } else if (mode == 2) { //미승인 회원 조회
            type = "CUSTOMER";
        } else {
            type = "";
        }
        return adminMapper.lookupUserNumber(type);
    }

    @Override
    public List<UserDto> lookupUnapprovedUser(int page) throws Exception {
        Map<String, Integer> map = new HashMap<>();
        map.put("page", page);
        map.put("page_last", page + PAGE);
        return adminMapper.lookupUnapprovedUser(map);
    }

    @Override
    public List<UserDto> lookupApprovedUser(int page) throws Exception {
        Map<String, Integer> map = new HashMap<>();
        map.put("page", page);
        map.put("page_last", page + PAGE);
        return adminMapper.lookupApprovedUser(map);
    }

    @Override
    public List<UserDto> lookupAllUser(int mode) throws Exception {
        String type;
        if(mode == 1){ //승인 조회
            type = "ROLE_USER";
        } else if (mode == 2) { //미승인 회원 조회
            type = "CUSTOMER";
        } else {
            type = "";
        }
        return adminMapper.lookupAllUser(type);
    }

    @Override
    public UserDto lookupUser(String email) throws Exception {
        return adminMapper.lookupUser(email);
    }

}
