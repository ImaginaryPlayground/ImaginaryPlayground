package com.yodel.imaginaryPlayground.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;

@Mapper
public interface UserMapper {
    public int test() throws SQLException;
}
