package com.armoury.backend.gallery;

import com.armoury.backend.config.BaseException;
import com.armoury.backend.config.BaseResponse;
import com.armoury.backend.gallery.model.GetToolInfoRes;
import com.armoury.backend.gallery.model.GetToolSumInfoRes;
import com.armoury.backend.gallery.model.PatchToolReq;
import com.armoury.backend.gallery.model.PostToolReq;
import com.armoury.backend.utils.JwtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.armoury.backend.config.BaseResponseStatus.INVALID_USER_JWT;

@RestController
@RequestMapping("/gallery")
@Tag(name = "Gallery", description = "갤러리와 관련된 기능 & 정보 제공")
public class GalleryController {
    final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private final GalleryProvider galleryProvider;

    @Autowired
    private final GalleryService galleryService;

    @Autowired
    private final JwtService jwtService;

    public GalleryController(GalleryProvider galleryProvider, GalleryService galleryService, JwtService jwtService) {
        this.galleryProvider = galleryProvider;
        this.galleryService = galleryService;
        this.jwtService = jwtService;
    }

    @ResponseBody
    @Operation(summary = "게시물 목록 조회", description = "pageNumber를 사용하여 1,2,...,N까지의 게시물 목록을 조회합니다. (현재 5개씩 조회)")
    @GetMapping("/toolList/{pageNumber}")
    public BaseResponse<List<GetToolSumInfoRes>> getPostsInfo(@PathVariable("pageNumber") int pageNum){
        try {
            List<GetToolSumInfoRes> infoList = galleryProvider.getPostsInfo(pageNum*5 - 5);
            return new BaseResponse<>(infoList);
        } catch(BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    @ResponseBody
    @Operation(summary = "공격 도구 정보 단일 조회", description = "공격 도구의 정보를 개별적으로 조회합니다.")
    @GetMapping("/tool/{postIdx}")
    public BaseResponse<GetToolInfoRes> getToolInfo(@PathVariable("postIdx") int postIdx){
        try {
            int userIdxByJwt = jwtService.getUserIdx();
            GetToolInfoRes getToolInfoRes= galleryProvider.getToolInfo(postIdx, userIdxByJwt);
            return new BaseResponse<>(getToolInfoRes);
        } catch (BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    @ResponseBody
    @Operation(summary = "사용자의 공격 도구 정보 조회", description = "사용자가 포스팅한 모든 공격 도구 정보를 조회합니다.")
    @GetMapping("/tool/myList")
    public BaseResponse<List<GetToolInfoRes>> getUserTools(){
        try {
            int userIdxByJwt = jwtService.getUserIdx();
            List<GetToolInfoRes> toolList = galleryProvider.getUserTools(userIdxByJwt);
            return new BaseResponse<>(toolList);
        } catch (BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    @ResponseBody
    @Operation(summary = "공격 도구 업로드", description = "새로운 공격 도구의 정보를 업로드합니다. (Share : 공유 - 1 / 개인 - 0 )")
    @PostMapping("/tool/upload")
    public BaseResponse<String> postNewAttackTool(@RequestBody PostToolReq toolInfo){
        // 데이터 검증 validation 필요
        // user validation 필요
        try {
            int postIdx = galleryService.postNewAttackTool(toolInfo);
            return new BaseResponse<>("새로운 공격 도구(postIdx: " + postIdx + ") 업로드에 성공 하였습니다.");
        } catch(BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    @ResponseBody
    @Operation(summary = "공격 도구 정보 수정", description = "공격 도구의 정보를 수정합니다.")
    @PatchMapping("/tool/modify")
    public BaseResponse<String> modifyToolInfo(@RequestBody PatchToolReq toolInfo) {
        // 데이터 검증 validation 필요
        // user validation 필요 (요청한 userIdx = 데이터의 userIdx)
        try {
            int userIdxByJwt = jwtService.getUserIdx();
            System.out.println("확인1: "+toolInfo.getPostIdx()+" "+ toolInfo.getTitle()+" "+ toolInfo.getUserIdx());
            if (userIdxByJwt != toolInfo.getUserIdx())
                return new BaseResponse<>(INVALID_USER_JWT);
            System.out.println("확인2: "+toolInfo.getPostIdx()+" "+ toolInfo.getTitle()+" "+ toolInfo.getUserIdx());
            galleryService.modifyToolInfo(toolInfo);
            return new BaseResponse<>("공격도구 정보 수정에 성공하였습니다.");

        } catch(BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    @ResponseBody
    @Operation(summary = "공격 도구 정보 삭제", description = "공격 도구의 정보를 삭제합니다.")
    @DeleteMapping("tool/delete/{postIdx}")
    public BaseResponse<String> deleteToolInfo(@PathVariable("postIdx") int postIdx){
        try {
            int userIdxByJwt = jwtService.getUserIdx();
            int result = galleryService.deleteToolInfo(postIdx, userIdxByJwt);
            if (result == 1)
                return new BaseResponse<>("공격도구 정보를 삭제하였습니다.");
            else
                return new BaseResponse<>("공격도구 정보 삭제에 실패했습니다.");
        } catch(BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }
}
