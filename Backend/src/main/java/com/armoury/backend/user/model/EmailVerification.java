package com.armoury.backend.user.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class EmailVerification {
    private long id;
    private String email;
    private int code;
}
