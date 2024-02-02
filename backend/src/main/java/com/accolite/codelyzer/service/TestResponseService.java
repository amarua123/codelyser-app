package com.accolite.codelyzer.service;

import com.accolite.codelyzer.model.TestResponse;
import com.accolite.codelyzer.requestbody.AnswerResponseBody;
import com.accolite.codelyzer.requestbody.TestResponseBody;

import java.util.List;

public interface TestResponseService {
    TestResponse saveTestResponse(TestResponseBody testResponseBody);

    TestResponse getTestResponseByEmail(String candidateEmail);

    List<TestResponse> getAllTestResponses();

    void deleteTestResponse(String candidateEmail);
    public void saveResponse(AnswerResponseBody answer);

    List<Long> getScoresByTestSetTitle(String testSetTitle);

}
