package com.armoury.backend.gallery;

import com.armoury.backend.config.BaseException;
import com.armoury.backend.gallery.model.GetToolInfoRes;
import com.armoury.backend.gallery.model.GetToolPHeartRes;
import com.armoury.backend.gallery.model.GetToolSumInfoRes;
import com.armoury.backend.gallery.model.PostCommentRes;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.armoury.backend.config.BaseResponseStatus.*;

@Service
public class GalleryProvider {
    final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private final GalleryService galleryService;
    @Autowired
    private final GalleryDao galleryDao;

    public GalleryProvider(GalleryService galleryService, GalleryDao galleryDao) {
        this.galleryService = galleryService;
        this.galleryDao = galleryDao;
    }

    public Integer getPageNum() throws BaseException{
        try {
            int postNumInPage = 5;
            int totalPostNum = galleryDao.countTotalPost();
            return totalPostNum / postNumInPage + 1;
        } catch (Exception exception){
            throw new BaseException(DATABASE_ERROR);
        }

    }

    public Integer getUserToolPageNum(int userIdx) throws BaseException{
        try {
            int postNumInPage = 5;
            int totalPostNum = galleryDao.countTotalUserPost(userIdx);
            return totalPostNum / postNumInPage + 1;
        } catch (Exception exception){
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public List<GetToolSumInfoRes> getPostsInfo(int pageNum) throws BaseException {
        if (pageNum < 0)
            throw new BaseException(EMPTY_CONTENT);
        List<GetToolSumInfoRes> infoList = galleryDao.getPostInfo(pageNum);
        if (infoList.size() == 0)
            throw new BaseException(EMPTY_CONTENT);
        return infoList;
    }

    public GetToolPHeartRes getToolInfo(int postIdx, int userIdx) throws BaseException {
        GetToolInfoRes toolInfo = null;
        try {
            toolInfo = galleryDao.getToolInfo(postIdx);
        } catch (Exception exception){
            throw new BaseException(WRONG_TOOL_INPUT_REQ);
        }

        System.out.println(toolInfo.getUserIdx());
        if (toolInfo.getShare() == 0 && toolInfo.getUserIdx() != userIdx)
            throw new BaseException(INVALID_USER_JWT);

        int isMyHeart = 0;
        if (galleryService.checkHeartExist(userIdx, postIdx))
            isMyHeart = 1;

        GetToolPHeartRes res = new GetToolPHeartRes(toolInfo.getPostIdx(), toolInfo.getUserIdx(), toolInfo.getNickName(), toolInfo.getTitle(),
                toolInfo.getDefinition(), toolInfo.getContents(), toolInfo.getUrl(), toolInfo.getPostTime(), toolInfo.getHeart(), isMyHeart);
        return res;
    }

    public List<GetToolInfoRes> getUserTools(int userIdx, int pageNum) throws BaseException {
        if (pageNum < 0)
            throw new BaseException(EMPTY_CONTENT);
        List<GetToolInfoRes> toolList = galleryDao.getUserTools(userIdx, pageNum);
        if (toolList.size() == 0)
            throw new BaseException(EMPTY_CONTENT);
        return toolList;
    }

    public List<PostCommentRes> getComments(int postIdx) throws BaseException {
        try {
            return galleryDao.getComments(postIdx);
        } catch (Exception exception){
            throw new BaseException(EMPTY_OUTPUT);
        }
    }
}