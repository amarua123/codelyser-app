package com.accolite.codelyzer.serviceimpl;

import com.accolite.codelyzer.model.*;
import com.accolite.codelyzer.repository.GroupRepo;
import com.accolite.codelyzer.repository.QuestionRepo;
import com.accolite.codelyzer.repository.TagRepo;
import com.accolite.codelyzer.repository.UserRepo;
import com.accolite.codelyzer.requestbody.QuestionBody;
import com.accolite.codelyzer.service.TagService;
import com.accolite.codelyzer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private TagRepo tagRepo;
    @Autowired
    private GroupRepo groupRepo;
    @Autowired
    private QuestionRepo questionRepo;
    @Autowired

    TagService tagService;

    @Override
    public User createUser(User user) {
        return userRepo.save(user);
    }

    @Override
    public Tag createTag(String tagName) {
        Tag tag = new Tag();
        tag.setTagName(tagName);
        return tagRepo.save(tag);
    }
//    public List<User> getUsersByEmail(String email) {
//        return userRepo.findByEmail(email);
//    }

    public List<User> getUsersByEmailSubstring(String emailSubstring) {
        return userRepo.findByEmailContaining(emailSubstring);
    }
    @Override
    public void createQuestion(QuestionBody questionBody) {
        Question question = new Question();
        Group group = groupRepo.findByGroupName(questionBody.getGroupName());
        if(group == null && questionBody.getGroupName() != null && !questionBody.getGroupName().trim().isEmpty()){
            group = new Group();
            group.setGroupName(questionBody.getGroupName());
            groupRepo.save(group);
        }
//        question.setGroup(group);
//        System.out.println(group);
        question.setQuestionType(questionBody.getQuestionType());
        question.setDescription(questionBody.getDescription());

//        Set<Tag> tagSet = new HashSet<>();
//        List<String> tags = questionBody.getTagSet();
//        tags.forEach(tag-> tagSet.add(tagService.getOrCreateTag(tag)));
//        List<Tag> tagSet = tagRepo.findByTagNameIn(questionBody.getTagSet());

        if(questionBody.getDescriptionWithCode() != null && !questionBody.getDescriptionWithCode().trim().isEmpty()){
            question.setDescriptionWithCode(questionBody.getDescriptionWithCode());
        }

        List<Option> options = new ArrayList<>();
        char ch = 'A';
        StringBuilder answer = new StringBuilder();
        HashSet<String> ansSet = new HashSet<>(questionBody.getAnswers());
        for(String curOption: questionBody.getOptions()){
            Option option = new Option();
            option.setOptionText(curOption);
            option.setQuestion(question);
            option.setAnsCh(ch);
            options.add(option);
            if(ansSet.contains(curOption)){
                answer.append(ch);
            }
            ch += 1;
        }
        question.setOptions(options);

        question.setAnswer(answer.toString());



//        question.setCorrectAnswer(answers);
//        Set<Tag> tagSet = new HashSet<>();
//        List<String> tags = questionBody.getTagSet();
//        tags.forEach(tag->{
//            tagSet.add(tagService.getOrCreateTag(tag)) ;
//
//        });
//        question.setTagSet(tagSet);

//        question.setTagSet(new HashSet<>(tagSet));

//        for(Tag tag: tagSet){
//            tag.getQuestionSet().add(question);
//            tagRepo.save(tag);
//        }

        question.setAnswer(answer.toString());
        if(questionBody.getTagSet() != null){
            Set<Tag> tagSet = new HashSet<>();
            List<String> tags = questionBody.getTagSet();
            tags.forEach(tag->{
                tagSet.add(tagService.getOrCreateTag(tag)) ;

            });
            question.setTagSet(tagSet);
            for(Tag tag: tagSet){
                tag.getQuestionSet().add(question);
                tagRepo.save(tag);
            }
        }
        questionRepo.save(question);
    }


    @Override
    public void createAllQuestions(List<QuestionBody> questionBodies) {
        for (QuestionBody questionBody : questionBodies) {
            createQuestion(questionBody);
        }
    }


    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }
}

