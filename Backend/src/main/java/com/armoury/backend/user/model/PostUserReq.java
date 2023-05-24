package com.armoury.backend.user.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class PostUserReq {
    private String nickName;
    private String email;
    private String password;

    public PostUserReq() {} // 디폴트 생성자 추가

    public PostUserReq(String nickName, String email, String password) {
        this.nickName = nickName;
        this.email = email;
        this.password = password;
    }
}

