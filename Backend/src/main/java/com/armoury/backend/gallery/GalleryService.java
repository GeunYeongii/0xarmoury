package com.armoury.backend.gallery;

import com.armoury.backend.config.BaseException;
import com.armoury.backend.gallery.model.PatchToolReq;
import com.armoury.backend.gallery.model.PostToolReq;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.armoury.backend.config.BaseResponseStatus.DATABASE_ERROR;
import static com.armoury.backend.config.BaseResponseStatus.PATCH_EMPTY_TOOL;

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
            if (result == 0)
                throw new BaseException(PATCH_EMPTY_TOOL);
        } catch(Exception exception){
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public void deleteToolInfo(int postIdx, int userIdx) throws BaseException {
        galleryDao.deletePost(postIdx, userIdx);
    }
}
