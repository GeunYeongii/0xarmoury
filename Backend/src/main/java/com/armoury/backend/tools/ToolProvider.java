package com.armoury.backend.tools;

import com.armoury.backend.config.BaseException;
import com.armoury.backend.tools.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.armoury.backend.config.BaseResponseStatus.DATABASE_ERROR;
import static com.armoury.backend.config.BaseResponseStatus.EMPTY_CONTENT;

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

    public List<GetToolSumInfoRes> getToolsByCategoryIdx(int categoryIdx) throws BaseException{
        try{
            List<GetToolSumInfoRes> getToolRes = toolDao.getSumInfoByCategory(categoryIdx);
            return getToolRes;
        }
        catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public List<GetCategoryRes> getCategoryAll() throws BaseException {
        try {
            return toolDao.getCategoryAll();
        }
        catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public List<data> getD3data() {
        String[] tacticNames = {
                "Reconnaissance", "Resource Development", "Initial Access", "Execution",
                "Persistence", "Privilege Escalation", "Defense Evasion", "Credential Access",
                "Discovery", "Lateral Movement", "Collection", "Command and Control", "Exfiltration", "Impact"
        };

        String[] code = { "RC","RD","IA","EX","PR","PE","DE","CA","DI","LM","CO","EXF","C2","IM"};

        List<data> res = new ArrayList<>();
        for (int i = 0; i < tacticNames.length ; i++) {
            List<TechniqueRow> trn= toolDao.getTechInTactic(i+1);
            for (TechniqueRow techniqueRow : trn) {
                List<String> techniques = toolDao.getToolsByTechnique(code[i], techniqueRow.getRn() + "");
                List<TechniqueToolData> ttd = new ArrayList<>();
                for (String tech : techniques)
                    ttd.add(new TechniqueToolData(tech, 1));
                if (techniques.size() != 0 && ttd.size() != 0) {
                    TechniqueTool tt = new TechniqueTool(techniqueRow.getTechName(), ttd);
                    res.add(new data(tacticNames[i], tt));
                }
            }
        }

        return res;
    }

    public List<String> getToolsByTechnique(String amlPart) throws BaseException {
        String[] sections = amlPart.split("-");
        try {
            return toolDao.getToolsByTechnique(sections[0], sections[1]);
        }
        catch (Exception exception) {
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public List<String> getAMLByIdx(int toolIdx) throws BaseException{
        String aml = toolDao.getAMLByIdx(toolIdx);
        System.out.println(aml);
        if (aml.isEmpty())
            throw new BaseException(EMPTY_CONTENT);
        return extractAML(aml);
    }

    public List<String> getAMLByName(String toolName) throws BaseException{
        String aml = toolDao.getAMLByName(toolName);
        if (aml.isEmpty())
            throw new BaseException(EMPTY_CONTENT);
        return extractAML(aml);
    }

    public List<String> extractAML(String aml) {
        List<String> list = new ArrayList<>();
        String[] sections = aml.split(":");

        for (String section : sections) {
            String prefix = section.substring(0, 2);
            String valuesString = section.substring(3, section.length() - 1);
            String[] values = valuesString.split(",");

            for (String value : values) {
                list.add(prefix + "-" + value);
            }
        }
        return list;
    }

}
