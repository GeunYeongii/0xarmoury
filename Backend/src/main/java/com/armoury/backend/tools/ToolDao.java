package com.armoury.backend.tools;

import com.armoury.backend.tools.model.GetCategoryRes;
import com.armoury.backend.tools.model.GetToolRes;
import com.armoury.backend.tools.model.GetToolSumInfoRes;
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

    public String getAMLByIdx(int toolIdx) {
        String getToolQuery = "SELECT aml FROM Tool WHERE toolIdx = ?";
        return this.jdbcTemplate.queryForObject(getToolQuery, String.class, toolIdx);
    }

    public String getAMLByName(String toolName) {
        String getToolQuery = "SELECT aml FROM Tool WHERE toolName = ?";
        return this.jdbcTemplate.queryForObject(getToolQuery, String.class, toolName);
    }
}
