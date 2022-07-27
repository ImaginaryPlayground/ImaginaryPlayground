package com.yodel.imaginaryPlayground.model.dto;

import io.swagger.annotations.ApiModel;
import lombok.Data;

@Data
@ApiModel(value = "HospitalDto (병원 검색에 필요한 DTO)", description = "병원 이름, 좌표, 주소, 연락처, 시도군구 코드, 우편주소 등 기록된 DTO")
public class HospitalDto {
    private int id;
    private String name;
    private String pos_x;
    private String pos_y;
    private String address;
    private String tel;
    private int sido;
    private int gungu;
    private String post;
    private String date;
}
