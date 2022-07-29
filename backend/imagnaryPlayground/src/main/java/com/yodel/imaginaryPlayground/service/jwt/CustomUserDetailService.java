package com.yodel.imaginaryPlayground.service.jwt;

import com.yodel.imaginaryPlayground.model.dto.UserDto;
import com.yodel.imaginaryPlayground.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/*
http://localhost:8080/oauth2/authorization/google
http://localhost:8080/oauth2/authorization/naver
http://localhost:8080/oauth2/authorization/kakao
*/
@RequiredArgsConstructor
@Service
public class CustomUserDetailService implements UserDetailsService {

    private Logger logger = LoggerFactory.getLogger(CustomUserDetailService.class);
    
    private final UserService userService;
    
    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {

        UserDto user = userService.detailUser(Integer.parseInt(userId));
        List<String> list = new ArrayList<>();
        list.add(user.getType());

        // UserDto 내부에 권한을 집어넣는다. 권한은 여러개 배분할 수 있지만 이번 프로젝트에서는 DB에 있는 한 권한만 추가한다.
        user.setRoles(list);

        return user;
    }
}