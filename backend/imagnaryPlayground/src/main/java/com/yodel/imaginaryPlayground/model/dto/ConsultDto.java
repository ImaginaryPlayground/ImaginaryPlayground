package com.yodel.imaginaryPlayground.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ConsultDto {
    private int id;
    private int baby_id;
    private String date;
    private String content;
    private int type;
}
