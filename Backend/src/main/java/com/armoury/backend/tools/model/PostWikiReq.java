package com.armoury.backend.tools.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PostWikiReq {
    private int toolIdx;
    private String wikiInfo;
}
