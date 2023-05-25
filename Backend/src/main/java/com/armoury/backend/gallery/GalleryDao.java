package com.armoury.backend.gallery;

import com.armoury.backend.gallery.model.GetToolInfoRes;
import com.armoury.backend.gallery.model.GetToolSumInfoRes;
import com.armoury.backend.gallery.model.PostCommentRes;
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

    public Integer countTotalPost() {
        String countQuery = "SELECT COUNT(*) FROM Post";
        return this.jdbcTemplate.queryForObject(countQuery, Integer.class);
    }

    public List<GetToolSumInfoRes> getPostInfo(int pageNum) {
        String getQuery = "SELECT p.postIdx, p.userIdx, u.nickName, p.title, p.postTime FROM Post AS p \n" +
                "JOIN User AS u ON p.userIdx = u.userIdx \n" +
                "ORDER BY postTime DESC LIMIT ?, 5;";
        return this.jdbcTemplate.query(getQuery,
                (rs, rowNum) -> new GetToolSumInfoRes(
                        rs.getInt("postIdx"),
                        rs.getInt("userIdx"),
                        rs.getString("nickName"),
                        rs.getString("title"),
                        rs.getString("postTime")
                ), pageNum);
    }

    public GetToolInfoRes getToolInfo(int postIdx) {
        String getQuery = "SELECT p.userIdx, u.nickName, p.title, p.definition, p.contents, p.url, p.share, p.postTime FROM Post AS p \n" +
                "JOIN User AS u ON p.userIdx = u.userIdx WHERE postIdx = ?";
        return this.jdbcTemplate.queryForObject(getQuery,
                (rs, rowNum) -> new GetToolInfoRes(
                       rs.getInt("userIdx"),
                       rs.getString("nickName"),
                       rs.getString("title"),
                       rs.getString("definition"),
                       rs.getString("contents"),
                       rs.getString("url"),
                       rs.getInt("share"),
                       rs.getString("postTime")
                ),
                postIdx);
    }

    public List<GetToolInfoRes> getUserTools(int userIdx) {
        String getQuery = "SELECT p.userIdx, u.nickName, p.title, p.definition, p.contents, p.url, p.share, p.postTime FROM Post AS p \n" +
                "JOIN User AS u ON p.userIdx = u.userIdx WHERE p.userIdx = ?";
        return this.jdbcTemplate.query(getQuery,
                (rs, rowNum) -> new GetToolInfoRes(
                        rs.getInt("userIdx"),
                        rs.getString("nickName"),
                        rs.getString("title"),
                        rs.getString("definition"),
                        rs.getString("contents"),
                        rs.getString("url"),
                        rs.getInt("share"),
                        rs.getString("postTime")
                ) ,userIdx);
    }

    public int createPost(int userIdx, String title, String defi, String contents, String url, int share) {
        String insertQuery = "INSERT INTO Post (userIdx, title, definition, contents, url, share) VALUES (?,?,?,?,?,?)";
        Object[] insertParams = new Object[]{userIdx, title, defi, contents, url, share};
        this.jdbcTemplate.update(insertQuery, insertParams);

        String lastInsertIdQuery = "select last_insert_id()";
        return this.jdbcTemplate.queryForObject(lastInsertIdQuery,int.class);
    }

    public int modifyPost(int postIdx, String title, String definition, String contents, String url, int share) {
        String modifyQuery = "UPDATE Post SET title = ?, definition = ?, contents = ?, url = ?, share = ? WHERE postIdx = ?";
        Object[] modifyParams = new Object[]{title, definition, contents, url, share, postIdx};

        return this.jdbcTemplate.update(modifyQuery, modifyParams);
    }

    public int deletePost(int postIdx, int userIdx) {
        String deleteQuery = "DELETE FROM Post WHERE postIdx = ? AND userIdx = ?";
        Object[] deleteParams = new Object[]{postIdx, userIdx};

        return this.jdbcTemplate.update(deleteQuery, deleteParams);
    }

    public List<PostCommentRes> getComments(int postIdx) {
        String getQuery = "SELECT c.commentIdx, c.userIdx, u.nickName, c.contents, c.postTime From Comments AS c \n"
                + "JOIN User AS u ON c.userIdx = u.userIdx WHERE c.postIdx = ?"; // + ORDER BY c.postTime ASC
        return this.jdbcTemplate.query(getQuery,
                (rs, rowNum) -> new PostCommentRes(
                        rs.getInt("commentIdx"),
                        rs.getInt("userIdx"),
                        rs.getString("nickName"),
                        rs.getString("contents"),
                        rs.getString("postTime")
                )
                ,postIdx);
    }

    public int createComment(int userIdx, int postIdx, String contents){
        String insertQuery = "INSERT INTO Comments (postIdx, userIdx, contents) VALUES (?,?,?)";
        Object[] insertParams = new Object[]{postIdx, userIdx, contents};
        this.jdbcTemplate.update(insertQuery, insertParams);

        String lastInsertIdQuery = "select last_insert_id()";
        return this.jdbcTemplate.queryForObject(lastInsertIdQuery,int.class);
    }

    public int modifyComment(int commentIdx, String contents) {
        String modifyQuery = "UPDATE Comments SET contents = ? WHERE commentIdx = ?";
        Object[] modifyParams = new Object[]{contents, commentIdx};

        return this.jdbcTemplate.update(modifyQuery, modifyParams);
    }

    public int deleteComment(int commentIdx, int userIdx) {
        String deleteQuery = "DELETE FROM Comments WHERE commentIdx = ? AND userIdx = ?";
        Object[] deleteParams = new Object[]{commentIdx, userIdx};

        return this.jdbcTemplate.update(deleteQuery, deleteParams);
    }

    public int whoPostTool (int postIdx){
        String selectQuery = "SELECT userIdx FROM Post WHERE postIdx = ?";
        return this.jdbcTemplate.queryForObject(selectQuery, int.class, postIdx);
    }

    public int whoPostComment (int commentIdx){
        String selectQuery = "SELECT userIdx FROM Comments WHERE commentIdx = ?";
        return this.jdbcTemplate.queryForObject(selectQuery, int.class, commentIdx);
    }

    public int checkPostExist(int postIdx) {
        String checkQuery = "SELECT EXISTS(SELECT postIdx FROM Post WHERE postIdx = ?)";
        return this.jdbcTemplate.queryForObject(checkQuery, int.class, postIdx);
    }
}
