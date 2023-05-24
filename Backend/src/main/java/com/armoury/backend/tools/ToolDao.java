package com.armoury.backend.tools;

import com.armoury.backend.tools.model.GetToolRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

@Repository
public class ToolDao {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public GetToolRes getToolByIdx(int toolIdx) {
        String getToolQuery = "SELECT toolIdx, toolName, definition, kaliInfo, mitreInfo, wikiInfo, toolUrl" +
                " FROM Tool WHERE toolIdx = ?";
        return this.jdbcTemplate.queryForObject(getToolQuery,
                (rs, rowNum) -> new GetToolRes(
                        rs.getInt("toolIdx"),
                        rs.getString("toolName"),
                        rs.getString("definition"),
                        rs.getString("kaliInfo"),
                        rs.getString("mitreInfo"),
                        rs.getString("wikiInfo"),
                        rs.getString("toolUrl")),
                toolIdx);
    }

    public GetToolRes getToolByName(String toolName) {
        String getToolQuery = "SELECT toolIdx, toolName, definition, kaliInfo, mitreInfo, wikiInfo, toolUrl" +
                " FROM Tool WHERE toolName = ?";
        return this.jdbcTemplate.queryForObject(getToolQuery,
                (rs, rowNum) -> new GetToolRes(
                        rs.getInt("toolIdx"),
                        rs.getString("toolName"),
                        rs.getString("definition"),
                        rs.getString("kaliInfo"),
                        rs.getString("mitreInfo"),
                        rs.getString("wikiInfo"),
                        rs.getString("toolUrl")),
                toolName);
    }
}
