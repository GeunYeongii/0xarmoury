package com.armoury.backend.gallery;

import com.armoury.backend.config.BaseException;
import com.armoury.backend.gallery.model.PostToolReq;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

}
