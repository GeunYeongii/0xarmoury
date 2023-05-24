package com.armoury.backend.gallery.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PostToolReq {
    private int userIdx;
    private String title;
    private String definition;
    private String contents;
    private String url;
    private int share;
}
