package com.yodel.imaginaryPlayground.service;

import com.yodel.imaginaryPlayground.model.dto.UserDto;
import org.apache.catalina.User;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

public interface AdminService {
    int approveUserType(Map<String, String> map) throws Exception;
    List<UserDto> lookupAllUser() throws Exception;
    List<UserDto> lookupUnapprovedUser(int page) throws Exception;
    UserDto lookupUser(String email) throws Exception;
    int deleteUser(String email) throws Exception;
}
