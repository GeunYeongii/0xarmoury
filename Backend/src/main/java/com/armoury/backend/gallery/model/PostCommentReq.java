package com.armoury.backend.gallery.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PostCommentReq {
    private int postIdx;
    private int userIdx;
    private String contents;
}
