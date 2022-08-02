package com.yodel.imaginaryPlayground.model.dto;

import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "QuestionDto (질문글)", description = "기록한 유저, 제목, 내용, 질문 유형, 비밀글 여부, 답변 완료, 생성/수정 날짜가 기록된 DTO")
public class QuestionDto {
    private int id;
    private int user_id;
    private String email;
    private String title;
    private String content;
    private int qna_type;
    private int secret;
    private int completed;
    private String created_date;
    private String modified_date;
    private int page;
    private int page_last;
}
