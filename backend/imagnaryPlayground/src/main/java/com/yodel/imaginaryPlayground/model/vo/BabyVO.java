package com.yodel.imaginaryPlayground.model.vo;

import io.swagger.annotations.ApiModel;
import lombok.Data;

@Data
@ApiModel(value = "BabyVO (아이조회 VO)", description = "다수의 아이 검색에 필요한 VO")
public class BabyVO {
    //page: 요청 페이지(필수), key: 'name/age/gender', , value: 검색 내용
    private int page;
    private int page_last;
    private String name;
    private int age_1;
    private int age_2;
    private char gender;
    private int id;
    private int user_id;

    //조회문: 검색한 아이에 대한 개수
    private int searchedDataAllNum;
}
