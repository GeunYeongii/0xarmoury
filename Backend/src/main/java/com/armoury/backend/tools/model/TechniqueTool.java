package com.armoury.backend.tools.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.util.List;


@Getter
@Setter
@AllArgsConstructor
public class TechniqueTool {
    private String name;
    private List<TechniqueToolData> children;
}
