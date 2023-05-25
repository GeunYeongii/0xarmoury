package com.armoury.backend.gallery;

import com.armoury.backend.config.BaseException;
import com.armoury.backend.gallery.model.GetToolSumInfoRes;
import com.armoury.backend.gallery.model.PatchToolReq;
import com.armoury.backend.gallery.model.PostToolReq;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.armoury.backend.config.BaseResponseStatus.*;

@Service
public class GalleryService {
    final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private final GalleryDao galleryDao;

    public GalleryService(GalleryDao galleryDao) {
        this.galleryDao = galleryDao;
    }

    public int postNewAttackTool(PostToolReq toolInfo) throws BaseException {
        return galleryDao.createPost(toolInfo.getUserIdx(), toolInfo.getTitle(), toolInfo.getDefinition(), toolInfo.getContents(), toolInfo.getUrl(), toolInfo.getShare());
    }

    public void modifyToolInfo(PatchToolReq toolInfo) throws BaseException{
        // 공유한 사용자와 수정 요청 사용자가 동일한지 검증 필요
        try {
            int result = galleryDao.modifyPost(toolInfo.getPostIdx(), toolInfo.getTitle(), toolInfo.getDefinition(), toolInfo.getContents(), toolInfo.getUrl(), toolInfo.getShare());
            if (result == 0) {
                System.out.println("확인3: "+toolInfo.getPostIdx()+" "+ toolInfo.getTitle()+" "+ toolInfo.getUserIdx());
                throw new BaseException(PATCH_EMPTY_TOOL);
            }
        } catch(Exception exception){
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public int deleteToolInfo(int postIdx, int userIdx) throws BaseException {
        int postUser = 0;
        try {
            postUser = galleryDao.userWhoPostTool(postIdx);
        } catch(Exception exception){
            throw new BaseException(WRONG_TOOL_INPUT_REQ);
        }

        if (postUser != userIdx)
            throw new BaseException(INVALID_USER_JWT);

        return galleryDao.deletePost(postIdx, userIdx);
    }
}
