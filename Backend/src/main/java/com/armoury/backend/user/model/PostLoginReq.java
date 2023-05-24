package com.armoury.backend.user.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostLoginReq {
    private String email;
    private String password;

    public PostLoginReq(){}

    public PostLoginReq(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
