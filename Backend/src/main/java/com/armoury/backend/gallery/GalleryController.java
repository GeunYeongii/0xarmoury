package com.armoury.backend.gallery;

import com.armoury.backend.config.BaseException;
import com.armoury.backend.config.BaseResponse;
import com.armoury.backend.gallery.model.*;
import com.armoury.backend.utils.JwtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.armoury.backend.config.BaseResponseStatus.EMPTY_INPUT_REQ;
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
    @Operation(summary = "게시물 목록 페이지 수 반환 (int)", description = "게시글 조회에 사용되는 pageNumber의 전체 값을 반환합니다. 전체 개시글 수 / 5 + 1")
    @GetMapping("get/pageNumber")
    public BaseResponse<Integer> getPostsInfo(){
        try {
            Integer pageNum = galleryProvider.getPageNum();
            return new BaseResponse<>(pageNum);
        } catch(BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
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
        try {
            int userIdxByJwt = jwtService.getUserIdx();
            if (toolInfo.getTitle().isBlank())
                return new BaseResponse<>(EMPTY_INPUT_REQ);
            int postIdx = galleryService.postNewAttackTool(userIdxByJwt, toolInfo);
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
        try {
            int userIdxByJwt = jwtService.getUserIdx();
            if (userIdxByJwt != toolInfo.getUserIdx())
                return new BaseResponse<>(INVALID_USER_JWT);
            galleryService.modifyToolInfo(toolInfo, userIdxByJwt);
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

    @ResponseBody
    @Operation(summary = "포스트의 댓글 조회", description = "postIdx에 해당하는 포스트의 모든 댓글를 조회합니다.")
    @GetMapping("comments/{postIdx}")
    public BaseResponse<List<PostCommentRes>> getComments(@PathVariable("postIdx") int postIdx) {
        try {
            return new BaseResponse<>(galleryProvider.getComments(postIdx));
        } catch(BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    @ResponseBody
    @Operation(summary = "포스트에 댓글 생성", description = "댓글을 달아서 무기고를 활성화하자. ○( ＾皿＾)っ Hehehe…")
    @PostMapping("/comments/create")
    public BaseResponse<String> postComment(@RequestBody PostCommentReq postCommentReq){
        try {
            int userIdxByJwt = jwtService.getUserIdx();
            int commentIdx = galleryService.postComment(userIdxByJwt, postCommentReq);
            return new BaseResponse<>("새로운 댓글(commentIdx: " + commentIdx + ") 생성에 성공 하였습니다.");
        } catch (BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    @ResponseBody
    @Operation(summary = "포스트 댓글 삭제", description = "댓글을 삭제합니다.")
    @DeleteMapping("/comments/delete/{commentIdx}")
    public BaseResponse<String> postComment(@PathVariable("commentIdx") int commentIdx){
        try {
            int userIdxByJwt = jwtService.getUserIdx();
            int result = galleryService.deleteComment(commentIdx, userIdxByJwt);
            if (result == 1)
                return new BaseResponse<>("댓글을 삭제하였습니다.");
            else
                return new BaseResponse<>("댓글 삭제에 실패했습니다.");
        } catch (BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    @ResponseBody
    @Operation(summary = "포스트 댓글 수정", description = "댓글을 수정합니다.")
    @PatchMapping("/comments/modify")
    public BaseResponse<String> modifyToolInfo(@RequestBody PatchCommentReq patchCommentReq) {
        // 데이터 검증 validation 필요
        try {
            int userIdxByJwt = jwtService.getUserIdx();
            galleryService.modifyComment(patchCommentReq, userIdxByJwt);
            return new BaseResponse<>("댓글 수정에 성공하였습니다.");

        } catch(BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }
}
