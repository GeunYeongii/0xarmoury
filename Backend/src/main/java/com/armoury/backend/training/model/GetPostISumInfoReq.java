package com.armoury.backend.training.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GetPostISumInfoReq {
    private int categoryIdx;
    private int pageNum;
}
