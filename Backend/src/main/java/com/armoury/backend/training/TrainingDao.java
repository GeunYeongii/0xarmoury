package com.armoury.backend.training;

import com.armoury.backend.gallery.model.GetToolSumInfoRes;
import com.armoury.backend.training.model.GetPostSumInfoRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class TrainingDao {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource){
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public Integer countCategoryPosts(int categoryIdx) {
        String countQuery = "SELECT COUNT(*) FROM TrainingPost WHERE categoryIdx = ?";
        return this.jdbcTemplate.queryForObject(countQuery, Integer.class, categoryIdx);
    }

    public List<GetPostSumInfoRes> getPostInfo(int categoryIdx, int pageNum) {
        String getQuery = "SELECT tp.postIdx, tp.userIdx, u.nickName, tp.title, tp.description, tp.url, tp.postTime FROM TrainingPost AS tp \n" +
                "JOIN User AS u ON tp.userIdx = u.userIdx \n" +
                "WHERE tp.categoryIdx = ? ORDER BY tp.postTime DESC LIMIT ?, 6";
        Object[] params = new Object[]{categoryIdx, pageNum};
        return this.jdbcTemplate.query(getQuery,
                (rs, rowNum) -> new GetPostSumInfoRes(
                        rs.getInt("postIdx"),
                        rs.getInt("userIdx"),
                        rs.getString("nickName"),
                        rs.getString("title"),
                        rs.getString("description"),
                        rs.getString("url"),
                        rs.getString("postTime")
                ), params);
    }
}
