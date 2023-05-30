package com.armoury.backend.tools.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class data {
    private String name;
    private TechniqueTool children;
}
