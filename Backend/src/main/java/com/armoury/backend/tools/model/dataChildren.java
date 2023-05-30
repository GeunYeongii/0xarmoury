package com.armoury.backend.tools.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class dataChildren {
    private String name;    //technique 이름
    private List<TechniqueToolData> children;
}
