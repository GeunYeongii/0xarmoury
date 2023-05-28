package com.armoury.backend.tools;

import com.armoury.backend.config.BaseException;
import com.armoury.backend.tools.model.PostWikiReq;
import com.armoury.backend.utils.JwtService;
import org.springframework.stereotype.Service;

import static com.armoury.backend.config.BaseResponseStatus.DATABASE_ERROR;
import static com.armoury.backend.config.BaseResponseStatus.NEED_MASTER;

@Service
public class ToolService {

    private final ToolDao toolDao;
    private final JwtService jwtService;

    public ToolService(ToolDao toolDao, JwtService jwtService) {
        this.toolDao = toolDao;
        this.jwtService = jwtService;
    }

    public boolean updateWiki(int userIdx, PostWikiReq postWikiReq) throws BaseException {
        if (checkMaster(userIdx)){
            try {
                toolDao.updateWiki(postWikiReq.getToolIdx(), postWikiReq.getWikiInfo());
                return true;
            } catch(Exception exception){
                throw new BaseException(DATABASE_ERROR);
            }
        } else {
            throw new BaseException(NEED_MASTER);
        }
    }

    public boolean checkMaster(int userIdx) throws BaseException {
        try {
            int cnt = toolDao.getUserBadge(userIdx);
            return cnt >= 5;
        } catch(Exception exception){
            throw new BaseException(DATABASE_ERROR);
        }
    }
}
