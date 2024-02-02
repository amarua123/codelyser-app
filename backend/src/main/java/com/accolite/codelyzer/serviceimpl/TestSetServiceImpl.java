package com.accolite.codelyzer.serviceimpl;

import com.accolite.codelyzer.model.Question;
import com.accolite.codelyzer.model.TestSet;
import com.accolite.codelyzer.repository.*;
import com.accolite.codelyzer.requestbody.TestCredentialBody;
import com.accolite.codelyzer.requestbody.TestSetBody;
import com.accolite.codelyzer.service.TestSetService;
import com.accolite.codelyzer.model.TestCredentials;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class TestSetServiceImpl implements TestSetService {

    @Autowired
    private QuestionRepo questionRepo;
    @Autowired
    private TestResponseRepo testResponseRepo;
    @Autowired
    private TestCredentialsRepo testCredentialsRepo;
    @Autowired
    private TestSetRepo testSetRepo;
    @Autowired
    private CandidateRepo candidateRepo;

    @Override
    public TestSet saveTestSet(TestSetBody testSetBody) {
        TestSet testSet = new TestSet();
        testSet.setTestSetTitle(testSetBody.getTestTitle());
        List<Question> questions = new ArrayList<>();
        List<Long> quesIds = testSetBody.getQuestionIds();
        for (Long id : quesIds) {
            Optional<Question> question = questionRepo.findById(id);
            question.ifPresent(questions::add);
        }
        testSet.setQuestions(questions);
        return testSetRepo.save(testSet);
    }

    @Override
    public TestSet getTestSetById(Long testSetId) {
        return testSetRepo.findById(testSetId).orElse(null);
    }

    @Override
    public List<TestSet> getAllTestSets() {
        return testSetRepo.findAll();
    }

    @Override
    public void deleteTestSet(Long testSetId) {
        testSetRepo.deleteById(testSetId);
    }

    @Override
    public List<Question> getQuestionsByTestId(Long testSetId) {
        Optional<TestSet> optionalTestSet = testSetRepo.findById(testSetId);
        //if testSet is null
        return optionalTestSet.map(TestSet::getQuestions).orElse(Collections.emptyList());
    }

    @Override
    public List<Question> getQuestionsByTestTitle(String testTitle) {
        Optional<TestSet> optionalTestSet = testSetRepo.findByTestSetTitle(testTitle);

        return optionalTestSet.map(TestSet::getQuestions).orElse(Collections.emptyList());
    }

    @Override
    public List<TestCredentialBody> getEmailAddressesByTestTitle(String testTitle) {
        Optional<TestSet> optionalTestSet = testSetRepo.findByTestSetTitle(testTitle);

        if (optionalTestSet.isPresent()) {
            TestSet testSet = optionalTestSet.get();
            Long testSetId = testSet.getTestSetId();
            return getEmailAddressesByTestSetId(testSetId);
        } else {
            return Collections.emptyList();
        }
    }

    private List<TestCredentialBody> getEmailAddressesByTestSetId(Long testSetId) {
        Optional<TestSet> optionalTestSet = testSetRepo.findById(testSetId);

        if (optionalTestSet.isPresent()) {
            TestSet testSet = optionalTestSet.get();
            List<String> list = testSet.getTestCredentialsList().stream()
                    .map(TestCredentials::getEmailAddress)
                    .filter(email -> testResponseRepo.findByCandidateEmail(email) != null)
                    .toList();
            List<TestCredentials> testCredentials = list.stream().map(s -> testCredentialsRepo.findByEmailAddress(s)).collect(Collectors.toList());
            List<TestCredentialBody> testCredentialBodies = new ArrayList<>();
            for (TestCredentials testCredential : testCredentials) {
                TestCredentialBody testCredentialBody = new TestCredentialBody();
                testCredentialBody.setEmailAddress(testCredential.getEmailAddress());
//                testCredentialBody.setName(testCredential.getName());
                String candidateName = candidateRepo.findByCandidateEmail(testCredential.getEmailAddress()).getCandidateName();
                testCredentialBody.setName(candidateName);
                testCredentialBody.setTestId(testCredential.getTestSet().getTestSetId());
                Long score = testResponseRepo.findByCandidateEmail(testCredential.getEmailAddress()).getScore();
                testCredentialBody.setScore(score);
                testCredentialBodies.add(testCredentialBody);
            }
            return testCredentialBodies;
        } else {
            return Collections.emptyList();
        }
    }

}
