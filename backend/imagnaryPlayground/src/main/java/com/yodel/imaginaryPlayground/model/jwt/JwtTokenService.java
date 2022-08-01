package com.yodel.imaginaryPlayground.model.jwt;

import com.yodel.imaginaryPlayground.model.dto.UserDto;
import com.yodel.imaginaryPlayground.service.UserService;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;

@RequiredArgsConstructor
@Service
public class JwtTokenService { // JWT 토큰을 생성 및 검증 모듈

    private static Logger logger = LoggerFactory.getLogger(JwtTokenService.class);

    @Value("${spring.jwt.secret}")
    private String secretKey;

    private long tokenValidMilisecond = 1000L * 60 * 60; // 1시간만 토큰 유효

    private final UserDetailsService userDetailsService;

    private final UserService userService;

    @PostConstruct //암호키 생성
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    // Jwt 토큰 생성
    public String createToken(String userEmail, String role) {
        Claims claims = Jwts.claims().setSubject(userEmail); // id 구분자 넣기
        claims.put("role", role); // 권한 넣기
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims) // 데이터
                .setIssuedAt(now) // 토큰 발행일자
                .setExpiration(new Date(now.getTime() + tokenValidMilisecond)) // 유효시간 설정
                .signWith(SignatureAlgorithm.HS256, secretKey) // 암호화 알고리즘, secret값 세팅
                .compact();
    }

    // Jwt 토큰을 파싱하고 그 값으로 회원 정보를 불러온다.
    // 불러온 회원정보 객체를 UsernamePasswordAuthenticationToken 객체 안에 넣고 반환하여 Security Context 즉, thread Local에 집어넣는다
    public Authentication getAuthentication(String token) {
        UserDto user = userService.findByEmail(this.getUserEmail(token));
        return new UsernamePasswordAuthenticationToken(user, "", user.getAuthorities());
    }

    public boolean verifyToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token);
            return claims.getBody()
                    .getExpiration()
                    .after(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    // Jwt 토큰에서 회원 구별 정보 추출
    public String getUserEmail(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    /**
     * <pre>
     * Request의 Header에서 token 파싱 : "X-AUTH-TOKEN: jwt토큰"
     * </pre>
     *
     * @param req
     * @return
     */
    public String resolveToken(HttpServletRequest req) {
        return req.getHeader("X-AUTH-TOKEN");
    }

    /**
     * <per>
     * Jwt 토큰의 유효성 + 만료일자 확인
     * </per>
     *
     * @param jwtToken
     * @return
     */
    public boolean validateToken(String jwtToken) {
        try {

            logger.debug( "[JwtTokenProvider >> validateToken]" );

            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature", e);
            return false;
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token", e);
            return false;
        } catch (ExpiredJwtException e) {
            logger.error("Expired JWT token", e);
            return false;
        } catch (UnsupportedJwtException e) {
            logger.error("Unsupported JWT token", e);
            return false;
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty.", e);
            return false;
        }catch (Exception e) {
            return false;
        }
    }
}
