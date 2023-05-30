package com.armoury.backend.training;

import com.armoury.backend.config.BaseException;
import com.armoury.backend.config.BaseResponse;
import com.armoury.backend.gallery.model.GetToolInfoRes;
import com.armoury.backend.training.model.GetPostISumInfoReq;
import com.armoury.backend.training.model.GetPostInfoRes;
import com.armoury.backend.training.model.GetPostSumInfoRes;
import com.armoury.backend.utils.JwtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.armoury.backend.config.BaseResponseStatus.EMPTY_CONTENT;

@RestController
@RequestMapping("/training")
@Tag(name = "Training", description = "훈련 페이지와 관련된 기능 & 정보 제공")
public class TrainingController {
    final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private final TrainingProvider trainingProvider;
    @Autowired
    private final JwtService jwtService;

    public TrainingController(TrainingProvider trainingProvider, JwtService jwtService) {
        this.trainingProvider = trainingProvider;
        this.jwtService = jwtService;
    }

    @ResponseBody
    @Operation(summary = "카테고리 내의 게시물 목록 페이지 수 반환 (int)", description = "게시글 조회에 사용되는 pageNumber의 전체 값을 반환합니다. " +
            "</br>카테고리 전체 개시글 수 / 6 + 1")
    @GetMapping("{categoryIdx}/pageNumber")
    public BaseResponse<Integer> getPostsInfo(@PathVariable("categoryIdx") int categoryIdx){
        try {
            int pageNum = trainingProvider.getPageNum(categoryIdx);
            return new BaseResponse<>(pageNum);
        } catch(BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    @ResponseBody
    @Operation(summary = "카테고리 내의 게시물 목록 조회", description = "pageNumber를 사용하여 1,2,..., N까지의 게시물 목록을 조회합니다. (현재 6개씩 조회)")
    @PostMapping("/postList")
    public BaseResponse<List<GetPostSumInfoRes>> getPostsInfo(@RequestBody GetPostISumInfoReq getReq){
        try {
            if (getReq.getCategoryIdx() < 0 || getReq.getCategoryIdx() > 12)
                return new BaseResponse<>(EMPTY_CONTENT);
            List<GetPostSumInfoRes> infoList = trainingProvider.getPostsInfo(getReq.getCategoryIdx(), 6*(getReq.getPageNum() - 1));
            return new BaseResponse<>(infoList);
        } catch(BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }

    @ResponseBody
    @Operation(summary = "게시물 단일 조회", description = "Training 포스트를 개별적으로 조회합니다.")
    @GetMapping("/tool/{postIdx}")
    public BaseResponse<GetPostInfoRes> getPostInfo(@PathVariable("postIdx") int postIdx){
        try {
            GetPostInfoRes getPostInfoRes= trainingProvider.getSinglePostInfo(postIdx);
            return new BaseResponse<>(getPostInfoRes);
        } catch (BaseException exception){
            return new BaseResponse<>((exception.getStatus()));
        }
    }
}
