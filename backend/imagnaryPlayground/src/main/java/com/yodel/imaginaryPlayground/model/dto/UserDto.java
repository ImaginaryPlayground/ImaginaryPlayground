package com.yodel.imaginaryPlayground.model.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.*;
import org.springframework.security.core.authority.*;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@ApiModel(value = "UserDto (회원정보)", description = "id, 이메일, 회원명, 성별, 가입경로, 증명서 경로, 가입일/수정일, 회원구분을 가진 DTO")
public class UserDto implements UserDetails {
    private int id;

    @ApiModelProperty(value = "이메일")
    private String email;

    @ApiModelProperty(value = "이름", required = true)
    private String username;

    @ApiModelProperty(value = "가입경로")
    private String provider;

    @ApiModelProperty(value = "문서 경로", required = true)
    private String document;

    @ApiModelProperty(value = "가입일")
    private String join_date;

    @ApiModelProperty(value = "수정일")
    private String modified_date;

    @ApiModelProperty(value = "회원구분")
    private String type;

    @ApiModelProperty(value = "비밀번호")
    private String password;

    @ApiModelProperty(value = "유저의 권한을 저장하는 리스트")
    private List<String> roles = new ArrayList<>();

    @Builder
    public UserDto(String username, String email, String provider) {
        this.username = username;
        this.email = email;
        this.provider = provider;
    }

    public UserDto(String username, String email, String document, String provider) {
        this.username = username;
        this.email = email;
        this.document = document;
        this.provider = provider;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream().map( SimpleGrantedAuthority :: new ).collect( Collectors.toList() );
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
