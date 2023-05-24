package com.armoury.backend.tools;

import com.armoury.backend.config.BaseException;
import com.armoury.backend.tools.model.GetToolRes;
import com.armoury.backend.user.model.GetUserRes;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.armoury.backend.config.BaseResponseStatus.DATABASE_ERROR;

@Service
public class ToolProvider {
    final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final ToolDao toolDao;
    @Autowired
    public ToolProvider(ToolDao toolDao){
        this.toolDao = toolDao;
    }

    public GetToolRes getToolByIdx(int toolIdx) throws BaseException{
        try{
            GetToolRes getToolRes = toolDao.getToolByIdx(toolIdx);
            return getToolRes;
        }
        catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public GetToolRes getToolByName(String toolName) throws BaseException{
        try{
            GetToolRes getToolRes = toolDao.getToolByName(toolName);
            return getToolRes;
        }
        catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }
}
