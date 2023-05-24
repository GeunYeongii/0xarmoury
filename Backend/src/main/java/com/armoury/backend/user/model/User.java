package com.armoury.backend.user.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class User {
    private int userIdx;
    private String nickName;
    private String email;
    private String pwd;
    private int grade;

    public User() {} // 디폴트 생성자 추가

    public User(Integer userIdx,String nickName, String email, String password, Integer grade) {
        this.nickName = nickName;
        this.email = email;
        this.pwd = password;
        this.grade = grade;
        this.userIdx = userIdx;
    }
}
