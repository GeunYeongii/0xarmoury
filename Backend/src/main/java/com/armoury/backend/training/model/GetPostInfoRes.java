package com.armoury.backend.training.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GetPostInfoRes {
    private int postIdx;
    private int categoryIdx;
    private int userIdx;
    private String nickName;
    private String title;
    private String description;
    private String environment;
    private String answer;
    private String url;
    private String postTime;
}
