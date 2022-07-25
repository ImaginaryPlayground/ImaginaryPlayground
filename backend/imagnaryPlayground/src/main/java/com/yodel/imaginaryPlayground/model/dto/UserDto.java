package com.yodel.imaginaryPlayground.model.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Role;

@Data
@NoArgsConstructor
public class UserDto {
    private int id;
    private String email;
    private String username;
    private String joinDate;    // Date 였는지 타입 확인
    private String provider;
    private String providerId;
    private String profile_url;
    private String gender;
    private String type;

    @Builder
    public UserDto(String username, String email, String profile_url,  String provider) {
        this.username = username;
        this.email = email;
        this.profile_url = profile_url;
        this.provider = provider;
    }
    public UserDto update(String username, String profileUrl) {
        this.username = username;
        this.profile_url = profile_url;

        return this;
    }

}
