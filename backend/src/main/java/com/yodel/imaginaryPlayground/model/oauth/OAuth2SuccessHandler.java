package com.yodel.imaginaryPlayground.model.oauth;

import com.yodel.imaginaryPlayground.model.dto.UserDto;
import com.yodel.imaginaryPlayground.model.jwt.JwtTokenService;
import com.yodel.imaginaryPlayground.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

/*
http://localhost:8080/oauth2/authorization/google
http://localhost:8080/oauth2/authorization/naver
http://localhost:8080/oauth2/authorization/kakao
*/
@RequiredArgsConstructor
@Component //Spring Security를 통해 소셜로그인을 성공적으로 완료했을 때 최종적으로 도착하는 곳
public class OAuth2SuccessHandler  extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenService jwtTokenService;
    private final UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(OAuth2SuccessHandler.class);
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException {

        OAuth2User oAuth2User = (OAuth2User)authentication.getPrincipal();
        UserDto userDto = this.toDto(oAuth2User);
        
        /*
        <oAuth2User.getAttributes().toString()>
        1. 구글 {sub, name, given_name, family_name, picture, email, email_verified, locale}
        2. 네이버 {resultcode=00, message=success, response={id, profile_image, email, name}}
        3. 카카오 {id, connected_at, properties={nickname, profile_image, thumbnail_image},
                kakao_account={profile_nickname_needs_agreement=false, profile_image_needs_agreement=false, profile={nickname=양요셉, thumbnail_image_url, profile_image_url, is_default_image}, has_email, email_needs_agreement, is_email_vali, is_email_verified, email}}
        */
        String URL;

        System.out.println("토큰 발행 시작: " + userDto.getEmail());

        String token = jwtTokenService.createToken(userDto.getEmail(), "ROLE_USER");

        System.out.println("토큰의 값 parsing 확인: " + jwtTokenService.getUserEmail(token));

        URL = UriComponentsBuilder.fromUriString("/")
                .queryParam("token", token)
                .build().toUriString();
        getRedirectStrategy().sendRedirect(request, response, URL);
    }

    // 값이 건너온 후 Map 객체에서 UserDto 변환 후 토큰 발행
    private UserDto toDto(OAuth2User oAuth2User) {
        var attributes = oAuth2User.getAttributes();
        return UserDto.builder()
                .email((String)attributes.get("email"))
                .username((String)attributes.get("username"))
                .build();
    }
}
