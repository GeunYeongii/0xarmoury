package com.armoury.backend.user;

import com.armoury.backend.config.BaseException;
import com.armoury.backend.config.BaseResponse;
import com.armoury.backend.user.model.*;
import com.armoury.backend.utils.JwtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import static com.armoury.backend.config.BaseResponseStatus.*;
import static com.armoury.backend.utils.ValidationRegex.isRegexEmail;

@RestController
@RequestMapping("/users")
@Tag(name = "User", description = "유저와 관련된 기능 & 정보 제공")
public class UserController {
    final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private final UserProvider userProvider;
    @Autowired
    private final UserService userService;
    @Autowired
    private final JwtService jwtService;


    public UserController(JwtService jwtService, UserProvider userProvider, UserService userService){
        this.jwtService = jwtService;
        this.userProvider = userProvider;
        this.userService = userService;
    }

    @ResponseBody
    @Operation(summary = "회원 조회", description = "이메일을 사용하여 유저를 조회합니다.")
    @GetMapping("/getUser")
    public BaseResponse<GetUserRes> getUsers(@RequestParam(required = true) String Email) {
        try{
            if(Email.length()==0){
                return new BaseResponse<>(POST_USERS_EMPTY_EMAIL);
            }
            // 이메일 정규표현
            if(!isRegexEmail(Email)){
                return new BaseResponse<>(POST_USERS_INVALID_EMAIL);
            }
            GetUserRes getUsersRes = userProvider.getUsersByEmail(Email);
            return new BaseResponse<>(getUsersRes);
        } catch(BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    @ResponseBody
    @Operation(summary = "회원 조회", description = "userIdx 사용하여 유저를 조회합니다.")
    @GetMapping("/{userIdx}") // (GET) 127.0.0.1:9000/users/:userIdx
    public BaseResponse<GetUserRes> getUserByIdx(@PathVariable("userIdx")int userIdx) {
        try{

            GetUserRes getUsersRes = userProvider.getUsersByIdx(userIdx);
            return new BaseResponse<>(getUsersRes);
        } catch(BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }


    @ResponseBody
    @Operation(summary = "회원가입", description = "새로운 유저를 생성합니다.")
    @PostMapping("/create") // (POST) 127.0.0.1:9000/users
    public BaseResponse<PostUserRes> createUser(@RequestBody PostUserReq postUserReq) {
        System.out.println(postUserReq.getEmail());
        System.out.println(postUserReq.getPassword());
        System.out.println(postUserReq.getNickName());
        if(postUserReq.getEmail() == null){
            return new BaseResponse<>(POST_USERS_EMPTY_EMAIL);
        }
        // 이메일 정규표현
        if(!isRegexEmail(postUserReq.getEmail())){
            return new BaseResponse<>(POST_USERS_INVALID_EMAIL);
        }
        try{
            PostUserRes postUserRes = userService.createUser(postUserReq);
            return new BaseResponse<>(postUserRes);
        } catch(BaseException exception){
            System.out.println(exception);
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    @ResponseBody
    @Operation(summary = "유저정보 변경", description = "유저의 정보를 변경합니다.")
    @PatchMapping("/{userIdx}") // (PATCH) 127.0.0.1:9000/users/:userIdx
    public BaseResponse<String> modifyUserName(@PathVariable("userIdx") int userIdx, @RequestBody User user){
        try {
            /* TODO: jwt는 다음주차에서 배울 내용입니다!
            jwt에서 idx 추출.
            int userIdxByJwt = jwtService.getUserIdx();
            userIdx와 접근한 유저가 같은지 확인
            if(userIdx != userIdxByJwt){
                return new BaseResponse<>(INVALID_USER_JWT);
            }
            */

            PatchUserReq patchUserReq = new PatchUserReq(userIdx,user.getNickName());
            userService.modifyUserName(patchUserReq);

            String result = "회원 정보 수정 완료";
            return new BaseResponse<>(result);
        } catch (BaseException exception) {
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    @ResponseBody
    @Operation(summary = "로그인", description = "유저 정보로 로그인 합니다.")
    @PostMapping("/login")
    public BaseResponse<PostUserRes> logIn(@RequestBody PostLoginReq postLoginReq){
        try {
            if (postLoginReq.getEmail() == null)
                return new BaseResponse<>(USERS_EMPTY_USER_ID);
            else if (postLoginReq.getPassword() == null)
                return new BaseResponse<>(POST_USERS_EMPTY_PASSWORD);

            PostUserRes postUserRes = userService.logIn(postLoginReq);
            return new BaseResponse<>(postUserRes);
        } catch (BaseException exception) {
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    @ResponseBody
    @GetMapping("/openVNC")
    public BaseResponse<String> vncConnect() {
        String vncServerHost = "localhost";
        int vncServerPort = 6901;
        String vncPassword = "password";

        String result = "https://" + vncServerHost + ":" + vncServerPort;
        return new BaseResponse<>(result);
    }

}
