package com.yodel.imaginaryPlayground.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BabyDto {
    private int id;
    private int user_id;
    private String name;
    private int age;
    private char gender;
    private String profile;
}
