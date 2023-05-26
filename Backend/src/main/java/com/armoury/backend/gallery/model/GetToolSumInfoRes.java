package com.armoury.backend.gallery.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GetToolSumInfoRes {
    private int postIdx;
    private int userIdx;
    private String userName;
    private String title;
    private String postTime;
}
