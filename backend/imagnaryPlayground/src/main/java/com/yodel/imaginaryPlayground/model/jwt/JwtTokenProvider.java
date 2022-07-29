package com.yodel.imaginaryPlayground.model.jwt;

import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Component
public class JwtTokenProvider { // JWT 토큰 생성 및 검증 모듈

    private static Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    @Value("${spring.jwt.secret}")
    private String secretKey;

    private long tokenValidMilisecond = 1000L * 60 * 60; // 1시간만 토큰 유효

    private final UserDetailsService userDetailsService;

    @PostConstruct //암호키 생성
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    // Jwt 토큰 생성
    public String createToken(String userId, List<String> roles) {
        Claims claims = Jwts.claims().setSubject(userId); // id 구분자 넣기
        claims.put("roles", roles); // 권한 넣기
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims) // 데이터
                .setIssuedAt(now) // 토큰 발행일자
                .setExpiration(new Date(now.getTime() + tokenValidMilisecond)) // 유효시간 설정
                .signWith(SignatureAlgorithm.HS256, secretKey) // 암호화 알고리즘, secret값 세팅
                .compact();
    }

    // Jwt 토큰으로 인증 정보를 조회
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserPk(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    // Jwt 토큰에서 회원 구별 정보 추출
    public String getUserPk(String token) {
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
