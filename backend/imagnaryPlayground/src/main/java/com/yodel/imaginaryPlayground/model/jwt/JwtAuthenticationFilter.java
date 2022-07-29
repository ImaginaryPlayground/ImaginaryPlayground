package com.yodel.imaginaryPlayground.model.jwt;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.*;
import org.springframework.security.core.context.*;
import org.springframework.web.filter.*;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter{ //request 이전 최초 실행
    private JwtTokenService jwtTokenService;
    public JwtAuthenticationFilter(JwtTokenService jwtTokenProvider) {
        this.jwtTokenService = jwtTokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = ((HttpServletRequest)request).getHeader("Auth");
        System.out.println("필터 발동: " + token);

        try{
            if (token != null && jwtTokenService.verifyToken(token)) { //토큰이 존재하면 일단 검증
                System.out.println("JwtAuthenticationFilter 실행: " + " email: " + jwtTokenService.getUserEmail(token) + " " +  token);
                Authentication authentication = jwtTokenService.getAuthentication(token); // token 분해 후 인증 객체로 남기고
                SecurityContextHolder.getContext().setAuthentication(authentication); // 저장
            }
        }catch(Exception e){
            e.printStackTrace();
        }

        filterChain.doFilter(request, response);
    }

}
