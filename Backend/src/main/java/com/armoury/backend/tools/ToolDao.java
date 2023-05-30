package com.armoury.backend.tools;

import com.armoury.backend.tools.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class ToolDao {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public GetToolRes getToolByIdx(int toolIdx) {
        String getToolQuery = "SELECT toolIdx, toolName, definition, options, mitreInfo, wikiInfo, toolUrl, aml \n" +
                " FROM Tool WHERE toolIdx = ?";
        return this.jdbcTemplate.queryForObject(getToolQuery,
                (rs, rowNum) -> new GetToolRes(
                        rs.getInt("toolIdx"),
                        rs.getString("toolName"),
                        rs.getString("definition"),
                        rs.getString("options"),
                        rs.getString("mitreInfo"),
                        rs.getString("wikiInfo"),
                        rs.getString("toolUrl"),
                        rs.getString("aml")),
                toolIdx);
    }

    public GetToolRes getToolByName(String toolName) {
        String getToolQuery = "SELECT toolIdx, toolName, definition, options, mitreInfo, wikiInfo, toolUrl, aml \n" +
                " FROM Tool WHERE toolName = ?";
        return this.jdbcTemplate.queryForObject(getToolQuery,
                (rs, rowNum) -> new GetToolRes(
                        rs.getInt("toolIdx"),
                        rs.getString("toolName"),
                        rs.getString("definition"),
                        rs.getString("options"),
                        rs.getString("mitreInfo"),
                        rs.getString("wikiInfo"),
                        rs.getString("toolUrl"),
                        rs.getString("aml")),
                toolName);
    }

    public List<GetToolSumInfoRes>  getSumInfoByCategory(int categoryIdx) {
        String getQuery = "SELECT t.toolIdx, t.toolName FROM Tool AS t WHERE t.toolIdx IN \n" +
                "(SELECT tc.toolIdx FROM ToolCategoryInfo AS tc WHERE tc.categoryIdx = ?)";
        return this.jdbcTemplate.query(getQuery,
                (rs, rowNum) -> new GetToolSumInfoRes(
                        rs.getInt("toolIdx"),
                        rs.getString("toolName")
                ), categoryIdx);
    }

    public List<GetCategoryRes> getCategoryAll() {
        String getQuery = "SELECT * FROM ToolCategory";
        return this.jdbcTemplate.query(getQuery,
                (rs, rowNum) -> new GetCategoryRes(
                        rs.getInt("categoryIdx"),
                        rs.getString("categoryName")
                ));
    }

    public List<String> getToolsByTechnique(String code, String rn) {
        String sql = "SELECT toolName FROM Tool WHERE aml REGEXP CONCAT('\\\\b', ?, '\\\\[([^\\\\]]*\\\\b)?', ?, '\\\\b([^\\\\]]*)\\\\]')";
        return jdbcTemplate.queryForList(sql, new Object[]{code, rn}, String.class);
    }

    public String getAMLByIdx(int toolIdx) {
        String getToolQuery = "SELECT aml FROM Tool WHERE toolIdx = ?";
        return this.jdbcTemplate.queryForObject(getToolQuery, String.class, toolIdx);
    }

    public String getAMLByName(String toolName) {
        String getToolQuery = "SELECT aml FROM Tool WHERE toolName = ?";
        return this.jdbcTemplate.queryForObject(getToolQuery, String.class, toolName);
    }

    public void updateWiki(int toolIdx, String wiki) {
        String updateQuery = "UPDATE Tool SET wikiInfo = ? WHERE toolIdx = ?";
        Object[] params = new Object[]{wiki, toolIdx};
        this.jdbcTemplate.update(updateQuery, params);
    }

    public int getUserBadge(int userIdx){
        String getQuery = "SELECT badge FROM User WHERE userIdx = ?";
        return this.jdbcTemplate.queryForObject(getQuery, int.class, userIdx);
    }

    public amlData getTechniqueByAmlData(int tacticCode, int rn) {
        String getQuery = "SELECT techniqueName, techId FROM MitreMatrix WHERE tacticCode = ? AND rowNum = ?";
        Object[] params = new Object[]{tacticCode, rn};
        return this.jdbcTemplate.queryForObject(getQuery,
                (rs, rowNum) -> new amlData (
                        rs.getString("techniqueName"),
                        rs.getString("techId")
                ), params);
    }

    public List<TechniqueRow> getTechInTactic(int categoryIdx) {
        String getQuery = "SELECT rowNum, techniqueName FROM MitreMatrix WHERE tacticCode = ?";
        return this.jdbcTemplate.query(getQuery,
                (rs, rowNum) -> new TechniqueRow (
                        rs.getInt("rowNum"),
                        rs.getString("techniqueName")
                ), categoryIdx);
    }
}
