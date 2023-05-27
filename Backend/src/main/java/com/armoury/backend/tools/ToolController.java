package com.armoury.backend.tools;

import com.armoury.backend.config.BaseException;
import com.armoury.backend.config.BaseResponse;
import com.armoury.backend.tools.model.GetToolRes;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tools")
@Tag(name = "Tools", description = "해킹 도구와 관련된 기능 & 정보 제공")
public class ToolController {
    final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private final ToolProvider toolProvider;

    public ToolController(ToolProvider toolProvider){
        this.toolProvider = toolProvider;
    }

    @ResponseBody
    @Operation(summary = "공식 공격 도구 개별 정보 조회 by toolIdx", description = "toolIdx 사용하여 공격 도구 정보 조회합니다.")
    @GetMapping("/{toolIdx}")
    public BaseResponse<GetToolRes> getToolByIdx (@PathVariable("toolIdx")int toolIdx){
        try{
            GetToolRes toolRes = toolProvider.getToolByIdx(toolIdx);
            return new BaseResponse<>(toolRes);
        } catch(BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    @ResponseBody
    @Operation(summary = "공식 공격 도구 개별 정보 조회 by 도구 이름", description = "도구 이름을 사용하여 공격 도구 정보 조회합니다.")
    @GetMapping("/toolName/")
    public BaseResponse<GetToolRes> getToolByIdx (@RequestParam(required = true) String toolName){
        try{
            GetToolRes toolRes = toolProvider.getToolByName(toolName);
            return new BaseResponse<>(toolRes);
        } catch(BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }
}

