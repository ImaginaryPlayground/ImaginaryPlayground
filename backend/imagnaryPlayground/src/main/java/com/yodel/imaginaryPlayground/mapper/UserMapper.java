package com.yodel.imaginaryPlayground.mapper;

import com.yodel.imaginaryPlayground.model.dto.BabyDto;
import com.yodel.imaginaryPlayground.model.dto.UserDto;
import com.yodel.imaginaryPlayground.model.vo.EmailCodeVO;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;
import java.util.Map;

@Mapper
public interface UserMapper {
    int saveUser(UserDto user) throws SQLException;
    int updateUserInfo(UserDto user) throws SQLException;
    int deleteUser(int userId) throws SQLException;
    UserDto detailUser(int userId) throws SQLException;
    // 사용자 전체 검색은 사용하지 않을 것 같아서 제외
    int countByEmail(String email) throws SQLException;
    UserDto findByEmail(String email) throws SQLException;
    int saveEmailAuth(Map<String, String> map);
    int authEmailCode(EmailCodeVO emailCodeVO);
    int deleteEmailCode(String email);
}
