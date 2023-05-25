package com.armoury.backend.gallery.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PostCommentRes {
    private int commentIdx;
    private int userIdx;
    private String userName;
    private String contents;
    private String postTime;
}
