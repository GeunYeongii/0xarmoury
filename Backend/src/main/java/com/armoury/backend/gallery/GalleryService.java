package com.armoury.backend.gallery;

import com.armoury.backend.config.BaseException;
import com.armoury.backend.gallery.model.PatchToolReq;
import com.armoury.backend.gallery.model.PostCommentReq;
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

    public void modifyToolInfo(PatchToolReq toolInfo, int userIdx) throws BaseException {
        if (!verifyUser_post(toolInfo.getPostIdx(), userIdx))
            throw new BaseException(INVALID_USER_JWT);

        try {
            int result = galleryDao.modifyPost(toolInfo.getPostIdx(), toolInfo.getTitle(), toolInfo.getDefinition(), toolInfo.getContents(), toolInfo.getUrl(), toolInfo.getShare());
            if (result == 0)
                throw new BaseException(PATCH_EMPTY_TOOL);
        } catch(Exception exception){
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public int deleteToolInfo(int postIdx, int userIdx) throws BaseException {
        if (!verifyUser_post(postIdx, userIdx))
            throw new BaseException(INVALID_USER_JWT);
        return galleryDao.deletePost(postIdx, userIdx);
    }

    public int postComment(int userIdx, PostCommentReq postCommentReq) throws BaseException {
        if (!checkPostExist(postCommentReq.getPostIdx()))
            throw new BaseException(WRONG_TOOL_INPUT_REQ);
        return galleryDao.createComment(userIdx, postCommentReq.getPostIdx(), postCommentReq.getContents());
    }

    public boolean verifyUser_post(int postIdx, int reqUserIdx) throws BaseException{
        try {
            int postUser = galleryDao.userWhoPostTool(postIdx);
            return postUser == reqUserIdx;
        } catch(Exception exception){
            throw new BaseException(WRONG_TOOL_INPUT_REQ);
        }
    }

    public boolean checkPostExist(int postIdx) throws BaseException {
        try {
            return galleryDao.checkPostExist(postIdx) == 1;
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }
}
