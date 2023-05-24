package com.armoury.backend.gallery;

import com.armoury.backend.config.BaseException;
import com.armoury.backend.gallery.model.GetToolSumInfoReq;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.armoury.backend.config.BaseResponseStatus.DATABASE_ERROR;
import static com.armoury.backend.config.BaseResponseStatus.EMPTY_CONTENT;
@Service
public class GalleryProvider {
    final Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private final GalleryDao galleryDao;

    public GalleryProvider(GalleryDao galleryDao) {
        this.galleryDao = galleryDao;
    }

    public List<GetToolSumInfoReq> getPostInfo(int pageNum) throws BaseException {
        if (pageNum < 0)
            throw new BaseException(EMPTY_CONTENT);
        List<GetToolSumInfoReq> infoList = galleryDao.getPostInfo(pageNum);
        if (infoList.size() == 0)
            throw new BaseException(EMPTY_CONTENT);
        return infoList;
    }
}
