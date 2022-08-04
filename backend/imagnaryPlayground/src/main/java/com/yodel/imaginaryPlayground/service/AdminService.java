package com.yodel.imaginaryPlayground.service;

import com.yodel.imaginaryPlayground.model.dto.UserDto;
import org.apache.catalina.User;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

public interface AdminService {
    int approveUser(List<String> list) throws Exception;
    int deleteUser(List<String> list) throws Exception;
    int lookupUserNumber(int mode) throws Exception;
    List<UserDto> lookupUnapprovedUser(int page) throws Exception;
    List<UserDto> lookupApprovedUser(int page) throws Exception;
    List<UserDto> lookupAllUser(int mode) throws Exception;
    UserDto lookupUser(String email) throws Exception;
}
