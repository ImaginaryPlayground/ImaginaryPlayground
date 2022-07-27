package com.yodel.imaginaryPlayground.model.dto;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "PageDto (검색에 필요한 DTO)", description = "페이지, 검색분류, 검색값이 기록된 DTO")
public class PageDto {
    private int page;
    private int page_last;
    private String key;
    private String value;
    private int qna_type;

}
