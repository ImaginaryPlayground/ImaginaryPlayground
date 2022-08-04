package com.yodel.imaginaryPlayground.model.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "BabyDto (아이정보)", description = "id, 담당자 식별자, 이름, 나이, 성별, 사진 경로, 특이사항이 기록된 DTO")
public class BabyDto {
    private int id;
    private int user_id;

    @ApiModelProperty(value = "아이의 이름")
    private String name;

    @ApiModelProperty(value = "나이")
    private int age;

    @ApiModelProperty(value = "성별")
    private char gender;

    @ApiModelProperty(value = "사진 경로")
    private String profile;

    @ApiModelProperty(value = "특이사항")
    private String character;

    @ApiModelProperty(value = "병원id")
    private int hospital_id;
}
