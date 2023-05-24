package com.armoury.backend.gallery;

import com.armoury.backend.config.BaseException;
import com.armoury.backend.config.BaseResponse;
import com.armoury.backend.gallery.model.CusToolInfo;
import com.armoury.backend.gallery.model.CusToolInfoDetail;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/gallery")
@Tag(name = "Gallery", description = "갤러리와 관련된 기능 & 정보 제공")
public class GalleryController {
    final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private final GalleryProvider galleryProvider;

    @Autowired
    private final GalleryService galleryService;

    public GalleryController(GalleryProvider galleryProvider, GalleryService galleryService) {
        this.galleryProvider = galleryProvider;
        this.galleryService = galleryService;
    }

    @ResponseBody
    @Operation(summary = "게시물 목록 조회", description = "pageNumber를 사용하여 1,2,...,N까지의 게시물 목록을 조회합니다.")
    @GetMapping("/posts/{pageNumber}")
    public BaseResponse<List<CusToolInfo>> getPostsInfo(@PathVariable("pageNumber") int pageNum){
        try {
            List<CusToolInfo> infoList = galleryProvider.getPostInfo(pageNum*5 - 5);
            return new BaseResponse<>(infoList);
        } catch(BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    @ResponseBody
    @Operation(summary = "공격 도구 업로드", description = "새로운 공격 도구의 정보를 업로느합니다. (Share : 공유 - 1 / 개인 - 0 )")
    @PostMapping("/posts/upload")
    public BaseResponse<String> postNewAttackTool(@RequestBody CusToolInfoDetail toolInfo){
        // 데이터 검증 validation 필요
        // user validation 필요
        try {
            int postIdx = galleryService.postNewAttackTool(toolInfo);
            return new BaseResponse<>("새로운 공격 도구(postIdx: " + postIdx + ") 업로드에 성공 하였습니다.");
        } catch(BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }
}
