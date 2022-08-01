package com.yodel.imaginaryPlayground.controller;

import com.yodel.imaginaryPlayground.model.dto.UserDto;
import com.yodel.imaginaryPlayground.model.jwt.JwtTokenService;
import com.yodel.imaginaryPlayground.model.vo.EmailCodeVO;
import com.yodel.imaginaryPlayground.service.EmailService;
import com.yodel.imaginaryPlayground.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.FileInputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final EmailService emailService;

    private final JwtTokenService jwtTokenService;
    private final PasswordEncoder passwordEncoder;

    private static final String success = "SUCCESS";
    private static final String fail = "FAIL";
    private static final String error = "ERROR";

    @PostMapping("/register")
    @ApiOperation(value = "회원가입", notes = "회원가입을 한다.")
    public Map<String, Object> signUp(
            @ApiParam(value = "이메일", required = true) @RequestParam String email,
            @ApiParam(value = "이름", required = true) @RequestParam String username,
            @ApiParam(value = "가입경로") @RequestParam String provider
    ) {

        if (provider == null) {
            provider = "SITE";
        }

        Map<String, Object> result = new HashMap<>();

        // 기존 사용자인지 확인(이메일 조회) => 바로 userService.login과 연결해서 token까지 받아와 반환해준다.
        try {
            int findUser = userService.countByEmail(email);
            if(findUser == 1) {     // 이미 존재하는 이메일
                result.put("status", fail);
            } else {                // 사용 가능한 이메일
                result.put("status", success);
            }
            UserDto user = new UserDto(email, username, provider);   // 유저 정보 반환
            result.put("data", user);
        } catch (Exception e) {
            result.put("error", error);
            result.put("message", e.getMessage());
        }
        return result;

    }

    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "로그인을 한다.")
    public Map<String, Object> login(
            @RequestBody @ApiParam(value = "로그인 정보를 입력한다.") UserDto user) {
        Map<String, Object> result = new HashMap<>();

        try {
            int res = userService.countByEmail(user.getEmail());
            if(res == 1){
                //공통으로 토큰이 들어간다(로그인 성공시 따로 넣어준다).
                //String token = jwtTokenService.createToken(userDto.getEmail(), "ROLE_USER");
                result.put("status", success);
//                result.put("token", token);
//                result
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        return result;
    }

    @GetMapping("/detail/{id}")
    @ApiOperation(value = "회원 정보 조회", notes = "회원 정보를 조회한다.")
    public Map<String, Object> detailUser(@PathVariable int id) {
        Map<String, Object> result = new HashMap<>();
        try {
            UserDto user = userService.detailUser(id);
            if(user != null){
                result.put("status", success);
                result.put("data", user);
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        return result;
    }

    @PutMapping("/update/{id}")
    @ApiOperation(value = "회원 정보 수정", notes = "회원 페이지에서 사용자의 정보를 수정할 수 있다.")
    public Map<String, Object> updateUserInfo(
            @PathVariable int id, @RequestBody String username){

        Map<String, Object> result = new HashMap<>();
        try {
            int res = userService.updateUserInfo(username);
            if(res == 1){
                result.put("status", success);
                result.put("data", userService.detailUser(id));
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }

        return result;
    }

    @DeleteMapping("/{id}")
    @ApiOperation(value = "회원 정보 삭제", notes = "회원 페이지에서 사용자의 정보를 삭제한다.")
    public Map<String, String> deleteUser(
            @PathVariable @ApiParam(value = "삭제하는 회원의 id를 넣어준다.", required = true) int id) {

        Map<String, String> result = new HashMap<>();
        try {
            int res = userService.deleteUser(id);
            if (res == 1) {
                result.put("status", success);
            } else {
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        return result;
    }

    @PostMapping("/upload")
    @ApiOperation(value = "재직 증명서 업로드")
    public Map<String, Object> uploadFile(
//            @RequestHeader String email,    // 이메일로 회원을 찾아서 회원의 재직 증명서 저장
            @RequestParam("file")MultipartFile file, HttpServletRequest request) throws Exception {

        Map<String, Object> result = new HashMap<>();

        String fileName = file.getOriginalFilename();
        System.out.println(fileName);
        System.out.println(request.getServletContext().getRealPath("/"));

        try {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmm");
            String uploadDate = simpleDateFormat.format(new Date());
            String document = save(file, request.getServletContext().getRealPath("/"), uploadDate);
//            UserDto userFile = new UserDto(email, document);   //이메일을 같이 넘겨줘야하나?

            userService.saveFile(document);
            result.put("status", success);
        } catch (IllegalStateException e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        return result;
    }

    @GetMapping("/getFile")
    @ApiOperation(value = "재직 증명서 가져오기")
    public Map<String, Object> getFile(@RequestParam String email, HttpServletRequest request) throws Exception{

        Map<String, Object> result = new HashMap<>();
        HttpHeaders header = new HttpHeaders();


        try {
            UserDto user = userService.findByEmail(email);
            String filePath = request.getServletContext().getRealPath("/") + user.getDocument();
            System.out.println(filePath);
            String mimeType = Files.probeContentType(Paths.get(filePath));  //파일 확장자
            System.out.println(mimeType);
            FileInputStream input = new FileInputStream(filePath);
            header.setContentType(MediaType.parseMediaType(mimeType));

            result.put("byte", IOUtils.toByteArray(input));
            result.put("header", header);
            result.put("status", success);

        } catch (IllegalStateException e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        return result;
    }

    @PostMapping("/authEmail/send")
    public Map<String, Object> sendEmail(@RequestBody String email){
        Map<String, Object> result = new HashMap<>();
        System.out.println("이메일 인증 진행 :"+ email);

        //먼저 관련 email 인증을 삭제한다
        userService.deleteEmailCode(email);

        final int CODE = (int) ( 100000 + Math.random()*899999); //임의의 6자리 코드 생성

        if(emailService.sendEmail( email // 메일 인증 성공
                , "[상상놀이터] 이메일 인증 안내"
                , "인증코드는 [ "+CODE+" ] 입니다.").get("status").equals(success)){
            int res = userService.saveEmailAuth(email, Integer.toString(CODE));
            if(res == 1){
                result.put("status", success);
            }else{
                result.put("status", error);
            }
        }else{
            // 메일 인증 실패
            result.put("status", fail);
        }

        return result;
    }

    @PostMapping("/authEmail/receive")
    public Map<String, Object> authEmailCode(@RequestBody EmailCodeVO emailCodeVO){
        Map<String, Object> result = new HashMap<>();
        System.out.println("이메일 코드 일치 여부 확인 :"+ emailCodeVO);

        String msg = "";
        int res = userService.authEmailCode(emailCodeVO);

        if(res == 1){
            result.put("status", success);
            result.put("message", "이메일 인증에 성공했습니다.");
            userService.deleteEmailCode(emailCodeVO.getEmail());
        }else{
            result.put("status", fail);
            result.put("message", "이메일 인증에 실패했습니다.");
        }
        return result;
    }

    @PostMapping("/token")
    public Map<String, Object> parseToken(@RequestBody String token){
        Map<String, Object> result = new HashMap<>();
        System.out.println("들어왔냐");
        System.out.println(SecurityContextHolder.getContext());
        //UserDto user2 = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        //System.out.println("login Service :" + user2.toString());

        return result;
    }

    private String save(MultipartFile file, String contextPath, String uploadDate) {

        try {
            String newFileName = uploadDate + file.getOriginalFilename();
            byte[] bytes = file.getBytes();
            Path path = Paths.get(contextPath + newFileName);
            Files.write(path, bytes);
            return newFileName;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
