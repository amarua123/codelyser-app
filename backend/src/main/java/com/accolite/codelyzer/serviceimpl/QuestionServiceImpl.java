package com.accolite.codelyzer.serviceimpl;

import com.accolite.codelyzer.model.*;
import com.accolite.codelyzer.repository.QuestionRepo;
import com.accolite.codelyzer.repository.TestCredentialsRepo;
import com.accolite.codelyzer.repository.TestSetRepo;
import com.accolite.codelyzer.requestbody.QuestionBody;
import com.accolite.codelyzer.service.QuestionService;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@Service
@Transactional
public class QuestionServiceImpl implements QuestionService {
    @Autowired
    QuestionRepo questionRepo;
    @Autowired
    TestSetRepo testSetRepo;
    @Autowired
    TestCredentialsRepo testCredentialsRepo;
    @Override
    public void saveAll(List<Question> questionList) {
        questionRepo.saveAll(questionList);

    }

    @Override
    public List<QuestionBody> getAllQuestions() {
        List<Question> questions= questionRepo.findAll();
        List<QuestionBody> questionBodies = new ArrayList<>();
        questions.forEach(question -> {
            QuestionBody questionBody = new QuestionBody();
            questionBody.setId(question.getId());
            questionBody.setDescription(question.getDescription());
            List<String> options = new ArrayList<>();
            List<Option> optionList = question.getOptions();
            optionList.forEach(option -> {
                options.add(option.getOptionText());

            });
            questionBody.setOptions(options);
            List<String> tagSet = new ArrayList<>();
            Set<Tag> tags = question.getTagSet();
            tags.forEach(tag->{
                tagSet.add(tag.getTagName());
            });
            questionBody.setTagSet(tagSet);
            questionBody.setQuestionType(question.getQuestionType());
            if(question.getDescriptionWithCode() != null && !question.getDescriptionWithCode().trim().isEmpty()){
                questionBody.setDescriptionWithCode(question.getDescriptionWithCode());
            }
            questionBody.setTickChars(question.getAnswer());
            questionBodies.add(questionBody);
        });
        return questionBodies;

    }
    public List<QuestionBody> getQuestionOfSets(String email) {
        if(!testCredentialsRepo.existsByEmailAddress(email)){
            return Collections.emptyList();
        }
        TestCredentials testCredentials = testCredentialsRepo.findByEmailAddress(email);
        TestSet testSet = testCredentials.getTestSet();
        List<Question> questions = testSet.getQuestions();
        List<QuestionBody> questionBodies = new ArrayList<>();
        questions.forEach(question -> {
            QuestionBody questionBody = new QuestionBody();
            questionBody.setId(question.getId());
            questionBody.setDescription(question.getDescription());
            List<String> options = new ArrayList<>();
            List<Option> optionList = question.getOptions();
            optionList.forEach(option -> {
                options.add(option.getOptionText());

            });
            if(question.getDescriptionWithCode() != null && !question.getDescriptionWithCode().trim().isEmpty()){
                questionBody.setDescriptionWithCode(question.getDescriptionWithCode());
            }
            questionBody.setQuestionType(question.getQuestionType());
            questionBody.setOptions(options);
            questionBodies.add(questionBody);
        });
//        System.out.println(questionBodies);
        return questionBodies;
    }

}
