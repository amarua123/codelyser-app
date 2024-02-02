package com.accolite.codelyzer.service;

import com.accolite.codelyzer.model.Question;
import com.accolite.codelyzer.model.TestCredentials;
import com.accolite.codelyzer.model.TestSet;
import com.accolite.codelyzer.requestbody.QuestionBody;
import com.accolite.codelyzer.requestbody.TestCredentialBody;
import com.accolite.codelyzer.requestbody.TestSetBody;

import java.util.List;

public interface TestSetService {
    TestSet saveTestSet(TestSetBody testSet);

    TestSet getTestSetById(Long testSetId);

    List<TestSet> getAllTestSets();

    void deleteTestSet(Long testSetId);

    List<Question> getQuestionsByTestId(Long testSetId);

    List<Question> getQuestionsByTestTitle(String testTitle);



    List<TestCredentialBody> getEmailAddressesByTestTitle(String testTitle);
}
