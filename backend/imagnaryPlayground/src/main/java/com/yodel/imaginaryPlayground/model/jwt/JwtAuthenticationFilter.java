package com.yodel.imaginaryPlayground.model.jwt;

import com.yodel.imaginaryPlayground.model.dto.UserDto;
import com.yodel.imaginaryPlayground.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.*;
import org.springframework.web.filter.*;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.util.Arrays;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean{
    private JwtTokenService jwtTokenService;
    private UserService userService;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        String token = ((HttpServletRequest)request).getHeader("Auth");

        if (token != null && jwtTokenService.verifyToken(token)) {
            System.out.println("JwtAuthenticationFilter 실행: " + token);
            String email = jwtTokenService.getUserEmail(token);

            // DB연동을 통해 데이터를 가져와 SpringContext에 저장

            UserDto user = userService.findByEmail(email);

            Authentication auth = getAuthentication(user);
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        chain.doFilter(request, response);
    }

    public Authentication getAuthentication(UserDto user) {
        return new UsernamePasswordAuthenticationToken(user, "",
                Arrays.asList(new SimpleGrantedAuthority("ROLE_USER")));
    }
}
