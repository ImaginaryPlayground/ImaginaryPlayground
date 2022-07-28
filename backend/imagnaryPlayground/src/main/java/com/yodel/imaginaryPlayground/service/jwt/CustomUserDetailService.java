//package com.yodel.imaginaryPlayground.service.jwt;
//
//import lombok.RequiredArgsConstructor;
//import org.slf4j.*;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.stereotype.Service;
//
//import javax.annotation.*;
//import java.util.HashMap;
//import java.util.Map;
//
//@RequiredArgsConstructor
////@Service
//public class CustomUserDetailService implements UserDetailsService {
//
//    private Logger logger = LoggerFactory.getLogger(CustomUserDetailService.class);
//
//    @Resource(name="signService")
//    private SignService signService;
//
//    public UserD loadUserByUsername(String userPk) {
//
//        Map<String, Object> param = new HashMap<String, Object>();
//        param.put("userId", userPk);
//
////        User result = signService.getUser(param);
////        List<String> list = new ArrayList<String>();
////        list.add("ROLE_USER");
////        list.add("ADMIN");
////        result.setRoles(list);
//
//        return result;
//    }
//}