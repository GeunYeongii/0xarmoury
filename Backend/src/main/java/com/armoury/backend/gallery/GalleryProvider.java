package com.armoury.backend.gallery;

import com.armoury.backend.config.BaseException;
import com.armoury.backend.gallery.model.GetToolInfoRes;
import com.armoury.backend.gallery.model.GetToolSumInfoRes;
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
    private final GalleryDao galleryDao;

    public GalleryProvider(GalleryDao galleryDao) {
        this.galleryDao = galleryDao;
    }

    public List<GetToolSumInfoRes> getPostsInfo(int pageNum) throws BaseException {
        if (pageNum < 0)
            throw new BaseException(EMPTY_CONTENT);
        List<GetToolSumInfoRes> infoList = galleryDao.getPostInfo(pageNum);
        if (infoList.size() == 0)
            throw new BaseException(EMPTY_CONTENT);
        return infoList;
    }

    public GetToolInfoRes getToolInfo(int postIdx, int userIdx) throws BaseException {
        GetToolInfoRes toolInfo = galleryDao.getToolInfo(postIdx);
        if (toolInfo.getUserIdx() != userIdx && toolInfo.getShare() == 0)
            throw new BaseException(INVALID_USER_JWT);
        return toolInfo;
    }
}
