package com.armoury.backend.user;


import com.armoury.backend.user.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class UserDao {

    private JdbcTemplate jdbcTemplate;

    @Autowired
    public void setDataSource(DataSource dataSource){
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<GetUserRes> getUsers(){
        String getUsersQuery = "SELECT userIdx, nickName, email FROM User";
        return this.jdbcTemplate.query(getUsersQuery,
                (rs,rowNum) -> new GetUserRes(
                        rs.getInt("userIdx"),
                        rs.getString("nickName"),
                        rs.getString("email")
                ));
    }

    public GetUserRes getUsersByEmail(String email){
        String getUsersByEmailQuery = "SELECT userIdx, nickName, email FROM User WHERE email=?";
        String getUsersByEmailParams = email;
        return this.jdbcTemplate.queryForObject(getUsersByEmailQuery,
                (rs, rowNum) -> new GetUserRes(
                        rs.getInt("userIdx"),
                        rs.getString("nickName"),
                        rs.getString("email")),
                getUsersByEmailParams);
    }

    public GetUserRes getUsersByIdx(int userIdx){
        String getUsersByIdxQuery = "SELECT userIdx,nickName,email FROM User WHERE userIdx=?";
        int getUsersByIdxParams = userIdx;
        return this.jdbcTemplate.queryForObject(getUsersByIdxQuery,
                (rs, rowNum) -> new GetUserRes(
                        rs.getInt("userIdx"),
                        rs.getString("nickName"),
                        rs.getString("email")),
                getUsersByIdxParams);
    }

    public User getPwd(String email) {
        String getPwdQuery = "SELECT userIdx, nickName, email, pwd, badge FROM User WHERE email = ?";
        Object[] userEmailParams = { email };
        try {
            User user = this.jdbcTemplate.queryForObject(getPwdQuery, userEmailParams, (rs, rowNum) -> new User(
                    rs.getInt("userIdx"),
                    rs.getString("nickName"),
                    rs.getString("email"),
                    rs.getString("pwd"),
                    rs.getInt("badge")
            ));
            System.out.println(user);
            System.out.println(user.getEmail());

            return user;

        } catch (EmptyResultDataAccessException e) {
            System.out.println(e);
            return null;
        }
    }

    public int createUser(PostUserReq postUserReq){
        String createUserQuery = "insert into User (nickName, email, pwd) VALUES (?,?,?)";
        Object[] createUserParams = new Object[]{ postUserReq.getNickName(), postUserReq.getEmail(), postUserReq.getPassword()};
        this.jdbcTemplate.update(createUserQuery, createUserParams);

        String lastInsertIdQuery = "select last_insert_id()";
        return this.jdbcTemplate.queryForObject(lastInsertIdQuery,int.class);
    }

    public int checkEmail(String email){
        String checkEmailQuery = "select exists(select email from User where email = ?)";
        String checkEmailParams = email;
        return this.jdbcTemplate.queryForObject(checkEmailQuery,
                int.class,
                checkEmailParams);

    }

    public int modifyUserName(PatchUserReq patchUserReq){
        String modifyUserNameQuery = "update User set nickName = ? where userIdx = ? ";
        Object[] modifyUserNameParams = new Object[]{patchUserReq.getNickName(), patchUserReq.getUserIdx()};

        return this.jdbcTemplate.update(modifyUserNameQuery,modifyUserNameParams);
    }

}
