package com.yodel.imaginaryPlayground.config;

import com.yodel.imaginaryPlayground.model.jwt.JwtAuthenticationFilter;
import com.yodel.imaginaryPlayground.model.jwt.JwtTokenService;
import com.yodel.imaginaryPlayground.model.oauth.OAuth2SuccessHandler;
import com.yodel.imaginaryPlayground.service.oauth.CustomOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.sql.SQLException;

@Configuration
@EnableWebSecurity  // 해당 애노테이션을 붙인 필터(현재 클래스)를 스프링 필터체인에 등록.
@RequiredArgsConstructor
public class SecurityConfig { //extends 하는 방식은 deprecated 이므로 @Bean 생성방식

    // 커스텀한 OAuth2UserService DI.
    private final JwtTokenService jwtTokenService;
    private final CustomOAuth2UserService customOAuth2UserService;

    // 커스텀한 Jwt Token Provider
    private final OAuth2SuccessHandler oauth2SuccessHandler;

    /* 특정 URI들을 리스트에 저장 */
    // Swagger
    private static final String[] SWAGGER_URI = {
            "/swagger-ui.html", "/v2/api-docs", "/swagger-resources/**", "/webjars/**", "/swagger/**"
    };

    // 로그인, 회원가입 등
    private static final String[] PUBLIC_URI = {
            "/", "/login", "/signup", "/*/signup/**", "/css/**", "/images/**", "/js/**", "/oauth2/**", "/user/login", "/token/**", "/user/**"
    };

    private static final String[] PUBLIC_GET_URI = {
            "/exception/**"
    };

    // 유저만 사용가능한 기능
    private static final String[] USER_URI = {
            "/user/**", "/user/care/**"
    };

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
        return (web) -> web.ignoring().antMatchers("image/**", "/kiosk/**"); // /image/** 있는 모든 파일들은 시큐리티 적용을 무시한다.
    }

    @Bean // OAuth2ResourceServerProperties.Jwt jwt, TokenService tokenService 두번째 세번째 매개변수 일단 생략
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.
                httpBasic().disable() //프론트엔드가 존재하여 REST API로 구성(Spring security에서 만들어주는 로그인 페이지 사용안함)
                .csrf().disable()  //csrf 사용안함: token 인증 방식
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // jwt token으로 인증할것이므로 세션필요없으므로 생성안함
                .and()
                .authorizeRequests()
                    .antMatchers(PUBLIC_URI).permitAll()
                    .antMatchers(SWAGGER_URI).permitAll()
                    .anyRequest().authenticated()
                .and()
                    .addFilterBefore(new JwtAuthenticationFilter(jwtTokenService), OAuth2LoginAuthenticationFilter.class)
                .oauth2Login() // oauth 로그인시
                    .loginPage("/token/expired") // 로그인 페이지 url 직접 설정
                    .successHandler(oauth2SuccessHandler) //로그인 성공시 핸들러
                    .userInfoEndpoint().userService(customOAuth2UserService);

        http.addFilterBefore(new JwtAuthenticationFilter(jwtTokenService), UsernamePasswordAuthenticationFilter.class);
       /*
                .authorizeRequests()
                    .antMatchers(PUBLIC_URI).permitAll()
                    .antMatchers(PUBLIC_GET_URI).permitAll()
                    .antMatchers(USER_URI).hasRole("USER") //유저만 사용 가능한 API
                    .anyRequest().hasRole("ADMIN") //관리자는 모두 사용가능 */

                /*.and()
                     // jwt token 필터를 id/password 인증 필터 전에 넣어라.
                    .oauth2Login()//url
                    .defaultSuccessUrl("/login-success")// customOAuth2UserService에서 처리를 하겠다. 그리고 "/login-success"로 이동하라.
                    .userInfoEndpoint()
                    .userService(customOAuth2UserService);	// oauth2 로그인에 성공하면, 유저 데이터를 가지고 우리가 생성한
        /*
        http.httpBasic().disable()   //프론트엔드가 존재하여 REST API로 구성(Spring security에서 만들어주는 로그인 페이지 사용안함)
                .csrf().disable();   //csrf 사용안함

        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);   // jwt token으로 인증할것이므로 세션필요X
           */
        //http.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);

        /* 오류 처리 부분
        http.exceptionHandling().accessDeniedHandler(new CustomAccessDeniedHandler())            // 인증 오류 발생 시 처리를 위한 핸들러 추가
                .and()
                .exceptionHandling().authenticationEntryPoint(new CustomAuthenticationEntryPoint())  // 인증 오류 발생 시 처리를 위한 핸들러 추가
        */

        return http.build();
    }
}
