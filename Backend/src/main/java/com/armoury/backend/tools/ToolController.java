package com.armoury.backend.tools;

import com.armoury.backend.config.BaseException;
import com.armoury.backend.config.BaseResponse;
import com.armoury.backend.config.BaseResponseStatus;
import com.armoury.backend.tools.model.GetToolRes;
import com.armoury.backend.tools.model.GetToolSumInfoRes;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @ResponseBody
    @Operation(summary = "공식 공격 도구 카테고리별 정보 조회", description = "칼리 기능 카테고리을 사용하여 공격 도구 정보 리스트를 조회합니다."
        + "</br>1    Information Gathering</br>2   Vulnerability Analysis</br>3   Web Application Analysis</br>4   Database Assessment"
        +"</br>5   Password Attacks</br>6   Wireless Attacks</br>7   Reverse Engineering</br>8   Exploitation Tools</br>"
        +"9   Sniffing & Spoofing</br>10   Post Exploitation</br>11   Forensics</br>12   Reporting Tools")
    @GetMapping("/category/{categoryIdx}")
    public BaseResponse<List<GetToolSumInfoRes>> getToolsByCategoryIdx (@PathVariable("categoryIdx")int categoryIdx){
        try{
            if (categoryIdx<1 || categoryIdx > 12)
                return new BaseResponse<>(BaseResponseStatus.WRONG_INPUT_REQ);
            List<GetToolSumInfoRes> infoList = toolProvider.getToolsByCategoryIdx(categoryIdx);
            return new BaseResponse<>(infoList);
        } catch(BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    @ResponseBody
    @Operation(summary = "공식 공격 도구 AML 조회 by toolIdx", description = "AML 정보를 list 형태로 반환합니다.")
    @GetMapping("/AML/{toolIdx}")
    public BaseResponse<List<String>> getAMLlByIdx (@PathVariable("toolIdx")int toolIdx){
        try{
            List<String> list = toolProvider.getAMLByIdx(toolIdx);
            return new BaseResponse<>(list);
        } catch(BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    @ResponseBody
    @Operation(summary = "공식 공격 도구 AML 조회 by toolName", description = "AML 정보를 list 형태로 반환합니다.")
    @GetMapping("/AML/toolName/")
    public BaseResponse<List<String>> getAMLlByIdx (@RequestParam(required = true) String toolName){
        try{
            List<String> list = toolProvider.getAMLByName(toolName);
            return new BaseResponse<>(list);
        } catch(BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }
}

