package com.armoury.backend.tools;

import com.armoury.backend.config.BaseException;
import com.armoury.backend.tools.model.GetMitreByAmlRes;
import com.armoury.backend.tools.model.PostWikiReq;
import com.armoury.backend.tools.model.amlData;
import com.armoury.backend.utils.JwtService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.armoury.backend.config.BaseResponseStatus.DATABASE_ERROR;
import static com.armoury.backend.config.BaseResponseStatus.NEED_MASTER;

@Service
public class ToolService {

    private final ToolDao toolDao;

    private final ToolProvider toolProvider;
    private final JwtService jwtService;

    public ToolService(ToolDao toolDao, ToolProvider toolProvider, JwtService jwtService) {
        this.toolDao = toolDao;
        this.toolProvider = toolProvider;
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

    public List<GetMitreByAmlRes> getMitreInfo(int toolIdx) throws BaseException {
        try {
            String aml = toolDao.getAMLByIdx(toolIdx);
            return extractAMLList(aml);
        } catch(Exception exception){
            throw new BaseException(DATABASE_ERROR);
        }
    }

    public List<GetMitreByAmlRes> extractAMLList(String aml) {
         // ['RC', 'RD', 'IA', 'EX', 'PR', 'PE', 'DE', 'CA', 'DI', 'LM', 'CO', 'EXF', 'C2', 'IM']
        List<String> steps = new ArrayList<>();
        steps.add("Reconnaissance");
        steps.add("Resource Development");
        steps.add("Initial Access");
        steps.add("Execution");
        steps.add("Persistence");
        steps.add("Privilege Escalation");
        steps.add("Defense Evasion");
        steps.add("Credential Access");
        steps.add("Discovery");
        steps.add("Lateral Movement");
        steps.add("Collection");
        steps.add("Command and Control");
        steps.add("Exfiltration");
        steps.add("Impact");
        List<GetMitreByAmlRes> resultList = new ArrayList<>();
        String[] sections = aml.split(":");

        for (String section : sections) {
            String[] parts = section.split("\\[");
            String codeName = parts[0];
            String[] values = parts[1].replaceAll("\\]", "").split(",");

            List<Integer> intList = new ArrayList<>();
            for (String value : values) {
                intList.add(Integer.parseInt(value));
            }

            int tcCode = getTacticFullName(codeName);
            String fullName = steps.get(tcCode);
            GetMitreByAmlRes result = new GetMitreByAmlRes(fullName, new ArrayList<>());

            for (int value : intList) {
                amlData amlDataObject = toolDao.getTechniqueByAmlData(tcCode + 1, value);
                amlDataObject.setUrl("https://attack.mitre.org/techniques/" + amlDataObject.getUrl() + "/");
                result.getTechniques().add(amlDataObject);
            }

            resultList.add(result);
            // System.out.println(fullName + ": " + intList);
        }
        return resultList;
    }

    private static int getTacticFullName(String variableName) {
        switch (variableName) {
            case "RC":
                return 0;
            case "RD":
                return 1;
            case "IA":
                return 2;
            case "EX":
                return 3;
            case "PR":
                return 4;
            case "PE":
                return 5;
            case "DE":
                return 6;
            case "CA":
                return 7;
            case "DI":
                return 8;
            case "LM":
                return 9;
            case "CO":
                return 10;
            case "EXF":
                return 11;
            case "C2":
                return 12;
            case "IM":
                return 13;
            default:
                return 0;
        }
    }

}
