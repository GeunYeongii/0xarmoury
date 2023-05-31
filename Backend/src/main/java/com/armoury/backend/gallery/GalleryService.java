package com.armoury.backend.gallery;

import com.armoury.backend.config.BaseException;
import com.armoury.backend.gallery.model.PatchCommentReq;
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

    public int postNewAttackTool(int userIdx, PostToolReq toolInfo) throws BaseException {
        try {
            // 공유 설정 및 마스터 사용자라면
            if (toolInfo.getShare() == 1 && galleryDao.checkMaster(userIdx) > 5) {
                int toolIdx = galleryDao.uploadTool(toolInfo.getTitle(), toolInfo.getDefinition(), toolInfo.getContents(), toolInfo.getUrl());
                galleryDao.updateTools(toolIdx);
            }
            return galleryDao.createPost(userIdx, toolInfo.getTitle(), toolInfo.getDefinition(), toolInfo.getContents(), toolInfo.getUrl(), toolInfo.getShare());
        } catch(Exception exception){
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public void modifyToolInfo(PatchToolReq toolInfo, int userIdx) throws BaseException {
        if (!verifyPostOwner(toolInfo.getPostIdx(), userIdx))
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
        if (!verifyPostOwner(postIdx, userIdx))
            throw new BaseException(INVALID_USER_JWT);
        return galleryDao.deletePost(postIdx, userIdx);
    }

    public int postComment(int userIdx, PostCommentReq postCommentReq) throws BaseException {
        if (!checkPostExist(postCommentReq.getPostIdx()))
            throw new BaseException(WRONG_TOOL_INPUT_REQ);
        return galleryDao.createComment(userIdx, postCommentReq.getPostIdx(), postCommentReq.getContents());
    }

    public void modifyComment(PatchCommentReq req, int userIdx) throws BaseException {
        if (!verifyCommentOwner(req.getCommentIdx(), userIdx))
            throw new BaseException(INVALID_USER_JWT);

        try {
            int result = galleryDao.modifyComment(req.getCommentIdx(), req.getContents());

            if (result == 0)
                throw new BaseException(PATCH_EMPTY_TOOL);
        } catch(Exception exception){
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public int deleteComment(int commentIdx, int userIdx) throws BaseException {
        if (!verifyCommentOwner(commentIdx, userIdx))
            throw new BaseException(INVALID_USER_JWT);

        return galleryDao.deleteComment(commentIdx, userIdx);
    }

    public boolean verifyPostOwner(int postIdx, int reqUserIdx) throws BaseException{
        try {
            int postUser = galleryDao.whoPostTool(postIdx);
            return postUser == reqUserIdx;
        } catch(Exception exception){
            throw new BaseException(WRONG_TOOL_INPUT_REQ);
        }
    }

    public boolean verifyCommentOwner(int commentIdx, int reqUserIdx) throws BaseException {
        try {
            int postUser = galleryDao.whoPostComment(commentIdx);
            return postUser == reqUserIdx;
        } catch(Exception exception){
            throw new BaseException(WRONG_TOOL_INPUT_REQ);
        }
    }

    public void postHeart(int userIdx, int postIdx) throws BaseException {
        if (!checkPostExist(postIdx))
            throw new BaseException(WRONG_TOOL_INPUT_REQ);
        int postUser = galleryDao.whoPostTool(postIdx);
        System.out.println(userIdx + " " + postUser);
        if (userIdx == postUser)
            throw new BaseException(NO_SELF_HEART);
        else if (checkHeartExist(userIdx, postIdx))
            throw new BaseException(DUPLICATE_HEART);
        try {
            galleryDao.postLike(userIdx, postIdx);
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public boolean checkPostExist(int postIdx) throws BaseException {
        try {
            return galleryDao.checkPostExist(postIdx) == 1;
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public boolean checkHeartExist(int userIdx, int postIdx) throws BaseException {
        try {
            return galleryDao.checkHeartExist(postIdx, userIdx) == 1;
        } catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }
}
