package com.accolite.codelyzer.service;

import com.accolite.codelyzer.model.Question;
import com.accolite.codelyzer.requestbody.QuestionBody;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

public interface QuestionService {
    void saveAll(List<Question> questionList);
    List<QuestionBody> getAllQuestions();
     List<QuestionBody> getQuestionOfSets(String email);
}
