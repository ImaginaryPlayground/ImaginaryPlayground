package com.yodel.imaginaryPlayground.model.vo;

import io.swagger.annotations.ApiModel;
import lombok.Data;

@Data
@ApiModel(value = "EmailCodeVO (이메일 인증용 VO)", description = "이메일 인증에 필요한 VO")
public class EmailCodeVO {
    private String email;
    private String CODE;
}
