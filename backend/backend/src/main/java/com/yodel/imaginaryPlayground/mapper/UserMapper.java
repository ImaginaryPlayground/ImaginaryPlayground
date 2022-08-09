package com.yodel.imaginaryPlayground.mapper;

import com.yodel.imaginaryPlayground.model.dto.UserDto;
import com.yodel.imaginaryPlayground.model.vo.EmailCodeVO;
import com.yodel.imaginaryPlayground.model.vo.PasswordVO;
import org.apache.ibatis.annotations.Mapper;

import java.sql.SQLException;
import java.util.Map;

@Mapper
public interface UserMapper {
    int saveUser(UserDto user);
    int getUserId(String email);
    int savePassword(PasswordVO passwordVO);
    String getPassword(int user_id);
    int updateUserInfo(UserDto user) throws SQLException;
    UserDto detailUser(int userId) throws SQLException;
    int deleteUser(int userId) throws SQLException;
    // 사용자 전체 검색은 사용하지 않을 것 같아서 제외
    int countByEmail(String email);
    UserDto findByEmail(String email);
    int saveFile(Map<String, String> map);
    int saveEmailAuth(Map<String, String> map);
    int authEmailCode(EmailCodeVO emailCodeVO);
    int deleteEmailCode(String email);
}
