package com.yodel.imaginaryPlayground.model.dto;

import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "AnswerDto (답변글)", description = "대답한 유저, 내용, 답변/수정 날짜가 기록된 DTO")
public class AnswerDto {
    private int id;
    private int question_id;
    private int admin_id;
    private String content;
    private String created_date;
    private String modified_date;
}
