package com.accolite.codelyzer.service;


import com.accolite.codelyzer.model.TestCredentials;
import com.accolite.codelyzer.requestbody.TestCredentialBody;

import java.util.List;

public interface TestCredentialsService {

    TestCredentials createTestCredentials(TestCredentialBody testCredentialBody);
    List<TestCredentials> getAllTestCredentials();
    TestCredentials getTestCredentialsById(Long testId);
    TestCredentials updateTestCredentials(Long testId, TestCredentials updatedCredentials);
    void deleteTestCredentials(Long testId);
    void saveAll(List<TestCredentials> testCredentials);

    List<String> getAllCandidateEmails();

    List<TestCredentialBody> getAllCandidateData();

    boolean verifyCandidateByEmail(String emailAddress);


    // Add other CRUD operations as needed
}
