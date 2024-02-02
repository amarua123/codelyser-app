package com.accolite.codelyzer.serviceimpl;



import com.accolite.codelyzer.model.TestCredentials;
import com.accolite.codelyzer.repository.TestCredentialsRepo;
import com.accolite.codelyzer.repository.TestResponseRepo;
import com.accolite.codelyzer.requestbody.TestCredentialBody;
import com.accolite.codelyzer.service.TestCredentialsService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class TestCredentialsServiceImpl implements TestCredentialsService {
    @Autowired
    private TestCredentialsRepo testCredentialsRepo;
    @Autowired
    private TestResponseRepo testResponseRepo;

    @Override
    public TestCredentials createTestCredentials(TestCredentialBody testCredentialBody) {
        TestCredentials testCredentials = new TestCredentials();
        testCredentials.setEmailAddress(testCredentialBody.getEmailAddress());
        testCredentials.setStartTime(testCredentialBody.getStartTime());
        testCredentials.setExpiryDate(testCredentialBody.getExpiryDate());
        testCredentials.setName(testCredentialBody.getName());
        testCredentials.setLinkSentStatus(false);
        testCredentials.setId(testCredentialBody.getTestId());
        return testCredentialsRepo.save(testCredentials);
    }

    @Override
    public List<TestCredentials> getAllTestCredentials() {
        return testCredentialsRepo.findAll();
    }

    @Override
    public TestCredentials getTestCredentialsById(Long testId) {
        return testCredentialsRepo.findById(testId).orElse(null);
    }

    @Override
    public TestCredentials updateTestCredentials(Long testId, TestCredentials updatedCredentials) {
        TestCredentials existingCredentials = testCredentialsRepo.findById(testId).orElse(null);
        if(existingCredentials != null) {

            existingCredentials.setEmailAddress(updatedCredentials.getEmailAddress());
            existingCredentials.setLinkSentStatus(updatedCredentials.isLinkSentStatus());
            existingCredentials.setExpiryDate(updatedCredentials.getExpiryDate());
            existingCredentials.setStartTime(updatedCredentials.getStartTime());
            existingCredentials.setQuestions(updatedCredentials.getQuestions());
            existingCredentials.setName(updatedCredentials.getName());
            return testCredentialsRepo.save(existingCredentials);
        }
        return null;
    }

    @Override
    public void deleteTestCredentials(Long testId) {
        testCredentialsRepo.deleteById(testId);
    }

    @Override
    public void saveAll(List<TestCredentials> testCredentials) {
        testCredentialsRepo.saveAll(testCredentials);
    }

    @Override
    public List<String> getAllCandidateEmails() {
        List<TestCredentials> testCredentialsList = testCredentialsRepo.findAll();
        List<String> emailAddresses = new ArrayList<>();

        for (TestCredentials testCredentials : testCredentialsList) {
            emailAddresses.add(testCredentials.getEmailAddress());
        }
        return emailAddresses;
    }

    @Override
    public List<TestCredentialBody> getAllCandidateData() {
        List<TestCredentials> testCredentialsList = testCredentialsRepo.findAll();
        List<TestCredentialBody>testCredentialBodies = new ArrayList<>();
        testCredentialsList.forEach(testCredentials -> {

            TestCredentialBody testCredentialBody = new TestCredentialBody();
            testCredentialBody.setTestTitle(testCredentials.getTestSet().getTestSetTitle());
            testCredentialBody.setTestId(testCredentials.getTestSet().getTestSetId());
            testCredentialBody.setName(testCredentials.getName());
            testCredentialBody.setEmailAddress(testCredentials.getEmailAddress());
            testCredentialBody.setLinkSentStatus(testCredentials.isLinkSentStatus());
            if(testResponseRepo.existsByCandidateEmail(testCredentials.getEmailAddress())){
                testCredentialBody.setScore(testResponseRepo.findByCandidateEmail(testCredentials.getEmailAddress()).getScore());
            }
            testCredentialBodies.add(testCredentialBody);

        });

        return testCredentialBodies;
    }

    @Override
    public boolean verifyCandidateByEmail(String emailAddress) {
        return testCredentialsRepo.existsByEmailAddress(emailAddress);
    }
}
