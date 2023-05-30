package com.armoury.backend.gallery.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GetToolPHeartRes {
    private int postIdx;
    private int userIdx;
    private String nickName;
    private String title;
    private String definition;
    private String contents;
    private String url;
    private String postTime;
    private int heart;
    private int myHeart;
}
