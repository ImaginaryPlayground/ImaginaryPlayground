package com.yodel.imaginaryPlayground.model.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "ConsultDto (상담내역)", description = "id, 아이 식별자, 년월일시, 내용, 응답구분이 기록된 DTO")
public class ConsultDto {
    private int id;
    private int baby_id;

    @ApiModelProperty(value = "년월일시")
    private String date;

    @ApiModelProperty(value = "내용기록")
    private String content;

    @ApiModelProperty(value = "응답구분")
    private int type;
}
