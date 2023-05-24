package com.armoury.backend.tools.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GetToolRes {
    private int toolIdx;
    private String toolName;
    private String definition;
    private String kaliInfo;
    private String mitreInfo;
    private String wikiInfo;
    private String toolUrl;
}
