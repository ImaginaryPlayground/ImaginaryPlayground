package com.yodel.imaginaryPlayground.config;

import com.yodel.imaginaryPlayground.service.CustomOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.token.TokenService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static com.google.common.base.Predicates.and;

@Configuration
@EnableWebSecurity  // 해당 애노테이션을 붙인 필터(현재 클래스)를 스프링 필터체인에 등록.
@RequiredArgsConstructor
public class SecurityConfig { //extends 하는 방식은 deprecated 이므로 @Bean 생성방식

    // 커스텀한 OAuth2UserService DI.
    private final CustomOAuth2UserService customOAuth2UserService;

    // encoder를 빈으로 등록.
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    //공식 문서: https://spring.io/blog/2022/02/21/spring-security-without-the-websecurityconfigureradapter
    /* deprecated 방식
    @Override
    public void configure(WebSecurity web) throws Exception {
        //web.ignoring().mvcMatchers("/members/**","/image/**");    // /image/** 있는 모든 파일들은 시큐리티 적용을 무시한다.
        web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations());    // 정적인 리소스들에 대해서 시큐리티 적용 무시.
    }
    */

    // WebSecurity에 필터를 거는 게 훨씬 빠름. HttpSecrity에 필터를 걸면, 이미 스프링 시큐리티 내부에 들어온 상태기 때문에..
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().antMatchers("/**/**", "image/**", "/kiosk/**"); // /image/** 있는 모든 파일들은 시큐리티 적용을 무시한다.
    }

    @Bean // OAuth2ResourceServerProperties.Jwt jwt, TokenService tokenService 두번째 세번째 매개변수 일단 생략
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/**", "/css/**", "/images/**", "/js/**").permitAll()
                //.antMatchers("/api/v1/**").hasRole(Role.USER.name()) 유저만 사용 가능한 api
                .and()
                    .logout()//어떻게 인식??
                    .logoutSuccessUrl("/")	// 로그아웃에 대해서 성공하면 "/"로 이동
                .and()
                    .oauth2Login()//url
                    .defaultSuccessUrl("/login-success")
                    .userInfoEndpoint()
                    .userService(customOAuth2UserService);	// oauth2 로그인에 성공하면, 유저 데이터를 가지고 우리가 생성한

        http.httpBasic().disable()   //프론트엔드가 존재하여 REST API로 구성(Spring security에서 만들어주는 로그인 페이지 사용안함)
                .csrf().disable();   //csrf 사용안함

        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);   //세션 사용X

        // customOAuth2UserService에서 처리를 하겠다. 그리고 "/login-success"로 이동하라.
        return http.build();
    }
}
