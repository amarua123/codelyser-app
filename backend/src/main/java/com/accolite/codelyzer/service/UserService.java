package com.accolite.codelyzer.service;

import com.accolite.codelyzer.model.Question;
import com.accolite.codelyzer.model.Tag;
import com.accolite.codelyzer.model.User;
import com.accolite.codelyzer.requestbody.QuestionBody;

import java.util.List;

public interface UserService {
    User createUser(User user);
    Tag createTag(String tagName);
    void createQuestion(QuestionBody questionBody);
    void createAllQuestions(List<QuestionBody> questionBodies);

    public List<User> getUsersByEmailSubstring(String emailSubstring);
//    public List<User> getUsersByEmail(String email);

    List<User> getAllUsers();


}
