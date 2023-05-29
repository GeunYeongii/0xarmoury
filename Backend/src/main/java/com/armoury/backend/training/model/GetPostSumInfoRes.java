package com.armoury.backend.training.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GetPostSumInfoRes {
    private int postIdx;
    private int userIdx;
    private String nickName;
    private String title;
    private String description;
    private String url;
    private String postTime;
}
