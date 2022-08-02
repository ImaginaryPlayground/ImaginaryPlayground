package com.yodel.imaginaryPlayground.model.vo;

import io.swagger.annotations.ApiModel;
import lombok.Data;

@Data
@ApiModel(value = "DeleteVO (질문 VO)", description = "질문/답변 삭제에 필요한 VO")
public class IdVO {
    private int id;
    private int user_id;
}
