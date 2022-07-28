package com.yodel.imaginaryPlayground.model.jwt;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.*;
import org.springframework.security.core.*;
import org.springframework.security.core.context.*;
import org.springframework.web.filter.*;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean{
    private JwtTokenProvider jwtTokenProvider;

    // Jwt Provier 주입
    public JwtAuthenticationFilter( JwtTokenProvider jwtTokenProvider ) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    /**
     * <pre>
     * Request로 들어오는 Jwt Token의 유효성을 검증(jwtTokenProvider.validateToken)하는 filter를 filterChain에 등록합니다.
     * </pre>
     *
     * @param request
     * @param response
     * @param filterChain
     * @throws IOException
     * @throws ServletException
     */
    @Override
    public void doFilter( ServletRequest request, ServletResponse response, FilterChain filterChain ) throws IOException, ServletException {
        String token = jwtTokenProvider.resolveToken( (HttpServletRequest) request );

        if( token != null && jwtTokenProvider.validateToken( token ) ) {
            Authentication auth = jwtTokenProvider.getAuthentication( token );
            SecurityContextHolder.getContext().setAuthentication( auth );
        }

        filterChain.doFilter( request, response );
    }
}
