package com.yodel.imaginaryPlayground.model.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Role;

@Data
@NoArgsConstructor
@ApiModel(value = "UserDto (회원정보)", description = "id, 이메일, 회원명, 성별, 가입경로, 증명서 경로, 가입일/수정일, 회원구분을 가진 DTO")
public class UserDto {
    private int id;

    @ApiModelProperty(value = "이메일")
    private String email;

    @ApiModelProperty(value = "이름")
    private String username;

    @ApiModelProperty(value = "성별")
    private String gender;

    @ApiModelProperty(value = "가입경로")
    private String provider;

    @ApiModelProperty(value = "문서 경로")
    private String document;

    @ApiModelProperty(value = "가입일")
    private String join_date;

    @ApiModelProperty(value = "수정일")
    private String modified_date;

    @ApiModelProperty(value = "회원구분")
    private String type;

    @Builder
    public UserDto(String username, String email, String document,  String provider) {
        this.username = username;
        this.email = email;
        this.document = document;
        this.provider = provider;
    }
    public UserDto update(String username, String document) {
        this.username = username;
        this.document = document;

        return this;
    }

}
