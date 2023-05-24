package com.armoury.backend.gallery;

import com.armoury.backend.gallery.model.GetToolInfoRes;
import com.armoury.backend.gallery.model.GetToolSumInfoRes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class GalleryDao {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource){
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<GetToolSumInfoRes> getPostInfo(int pageNum) {
        String getQuery = "SELECT postIdx, userIdx, title FROM Post ORDER BY postTime DESC LIMIT ?, 5;";
        return this.jdbcTemplate.query(getQuery,
                (rs, rowNum) -> new GetToolSumInfoRes(
                        rs.getInt("postIdx"),
                        rs.getInt("userIdx"),
                        rs.getString("title")
                ), pageNum);
    }

    public GetToolInfoRes getToolInfo(int postIdx) {
        String getQuery = "SELECT userIdx, title, definition, contents, url, share, postTime FROM Post WHERE postIdx = ?";
        return this.jdbcTemplate.queryForObject(getQuery,
                (rs, rowNum) -> new GetToolInfoRes(
                       rs.getInt("userIdx"),
                       rs.getString("title"),
                       rs.getString("definition"),
                       rs.getString("contents"),
                       rs.getString("url"),
                       rs.getInt("share"),
                       rs.getString("postTime")
                ),
                postIdx);
    }

    public GetToolSumInfoRes summaryToolInfo(int postIdx) {
        String getQuery = "SELECT postIdx, userIdx, title FROM Post WHERE postIdx = ?";
        return this.jdbcTemplate.queryForObject(getQuery,
                (rs, rowNum) -> new GetToolSumInfoRes(
                        rs.getInt("postIdx"),
                        rs.getInt("userIdx"),
                        rs.getString("title")
                ), postIdx);
    }

    public int createPost(int userIdx, String title, String defi, String contents, String url, int share) {
        String insertQuery = "INSERT INTO Post (userIdx, title, definition, contents, url, share) VALUES (?,?,?,?,?,?)";
        Object[] createParams = new Object[]{userIdx, title, defi, contents, url, share};
        this.jdbcTemplate.update(insertQuery, createParams);

        String lastInsertIdQuery = "select last_insert_id()";
        return this.jdbcTemplate.queryForObject(lastInsertIdQuery,int.class);
    }

    public int modifyPost(int postIdx, String title, String defi, String contents, String url, int share) {
        String modifyQuery = "UPDATE Post SET title = ?, defi = ?, contents = ?, url = ?, share = ?";
        Object modifyParams = new Object[]{title, defi, contents, url, share};

        return this.jdbcTemplate.update(modifyQuery, modifyParams);
    }

    public int deletePost(int postIdx, int userIdx) {
        String deleteQuery = "DELETE FROM Post WHERE postIdx = ? AND userIdx = ?";
        Object deleteParams = new Object[]{postIdx, userIdx};

        return this.jdbcTemplate.update(deleteQuery, deleteParams);
    }
}
