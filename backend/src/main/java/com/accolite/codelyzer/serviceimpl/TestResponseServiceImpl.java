package com.accolite.codelyzer.serviceimpl;

import com.accolite.codelyzer.model.*;
import com.accolite.codelyzer.repository.*;
import com.accolite.codelyzer.requestbody.AnswerResponseBody;
import com.accolite.codelyzer.requestbody.TestResponseBody;
import com.accolite.codelyzer.service.TestResponseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TestResponseServiceImpl implements TestResponseService {
    @Autowired
    private TestResponseRepo testResponseRepo;
    @Autowired
    private CandidateRepo candidateRepo;
    @Autowired
    private TestSetRepo testSetRepo;
    @Autowired
    private OptionRepo optionRepo;
    @Autowired
    private TestCredentialsRepo testCredentialsRepo;
    @Autowired
    private QuestionRepo questionRepo;


    @Override
    public TestResponse saveTestResponse(TestResponseBody testResponseBody) {
        TestResponse testResponse = new TestResponse();
        testResponse.setCandidateEmail(testResponseBody.getCandidateEmail());
        testResponse.setStartTime(testResponseBody.getStartTime());
        testResponse.setFinishTime(testResponseBody.getFinishTime());
        Optional<Candidate> candidate = candidateRepo.findById(testResponseBody.getCandidateId());
        testResponse.setCandidate(candidate.get());
        //if null then handle here
        Optional<TestSet> testSet = testSetRepo.findById(testResponseBody.getTestSetId());
        testResponse.setTestSet(testSet.get());
        List<Option> ans = new ArrayList<>();
//        for(Long optionId: testResponseBody.getSolutionResponseIds()){
//            ans.add(optionRepo.findById(optionId).get());
//        }
//        testResponse.setSolutionResponses(ans);
        return testResponseRepo.save(testResponse);
    }

    @Override
    public TestResponse getTestResponseByEmail(String candidateEmail) {
        return testResponseRepo.findById(candidateEmail).orElse(null);
    }

    @Override
    public List<TestResponse> getAllTestResponses() {
        return testResponseRepo.findAll();
    }

    @Override
    public void deleteTestResponse(String candidateEmail) {
        testResponseRepo.deleteById(candidateEmail);
    }

    @Override
    public void saveResponse(AnswerResponseBody answer) {
//        List<TestCredentials> questionList = testCredentialsRepo.findByEmailAddress(answer.getEmail());

        TestResponse testResponse = new TestResponse();
        testResponse.setCandidateEmail(answer.getEmail());
        List<Long> questionIds = answer.getQuestionIds();   //1, 2, 3, ...
        List<String> ans = answer.getAnswers();     //A, B, C, ...
        Candidate candidate = candidateRepo.findByCandidateEmail(answer.getEmail());
        TestCredentials testCredentials = testCredentialsRepo.findByEmailAddress(answer.getEmail());

        testResponse.setCandidate(candidate);
        testResponse.setTestSet(testCredentials.getTestSet());

        //set the following later
        //testSet
        testResponse.setStartTime(answer.getStartTime());
        testResponse.setFinishTime(answer.getFinishTime());
        long score = 0;
        List<Question> questions = new ArrayList<>();
        List<Option> ticks = new ArrayList<>();
       for(int i=0; i<questionIds.size();i++) {
           Optional<Question> question = questionRepo.findById(questionIds.get(i));
           if(question.isEmpty()) continue;
           questions.add(question.get());
           Option ticked = new Option();
           ticked.setAnsCh(ans.get(i).charAt(0));
           ticked.setTestResponse(testResponse);
           ticks.add(ticked);
           if (question.get().getAnswer().charAt(0) == ans.get(i).charAt(0)) {
               score++;
           }
       }
        testResponse.setQuestions(questions);
        testResponse.setTicked(ticks);
        testResponse.setScore(score);
        testResponseRepo.save(testResponse);
    }

    @Override
    public List<Long> getScoresByTestSetTitle(String testSetTitle) {
        Optional<TestSet> testSetOptional = testSetRepo.findByTestSetTitle(testSetTitle);

        if (testSetOptional.isPresent()) {
            TestSet testSet = testSetOptional.get();
            return testResponseRepo.findScoresByTestSetId(testSet.getTestSetId());
        } else {
            // Handle the case when the test set is not found
            return Collections.emptyList();
        }
    }
}
