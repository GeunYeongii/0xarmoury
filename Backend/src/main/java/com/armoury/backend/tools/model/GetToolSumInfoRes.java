package com.armoury.backend.tools.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GetToolSumInfoRes {
    private int toolIdx;
    private String toolName;
}
