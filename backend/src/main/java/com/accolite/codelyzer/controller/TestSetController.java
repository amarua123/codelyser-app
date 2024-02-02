package com.accolite.codelyzer.controller;

import com.accolite.codelyzer.model.Candidate;
import com.accolite.codelyzer.model.Question;
import com.accolite.codelyzer.model.TestCredentials;
import com.accolite.codelyzer.model.TestSet;
import com.accolite.codelyzer.requestbody.QuestionBody;
import com.accolite.codelyzer.requestbody.TestCredentialBody;
import com.accolite.codelyzer.requestbody.TestSetBody;
import com.accolite.codelyzer.service.TestCredentialsService;
import com.accolite.codelyzer.service.TestSetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/testSets")
@CrossOrigin(origins = "http://localhost:4200")
public class TestSetController {
    @Autowired
    private TestSetService testSetService;


    @PostMapping("create")
    public ResponseEntity<TestSet> createTestSet(@RequestBody TestSetBody testSetBody) {
        System.out.println(testSetBody);
        TestSet savedTestSet = testSetService.saveTestSet(testSetBody);
        return savedTestSet != null ? new ResponseEntity<>(savedTestSet, HttpStatus.CREATED) :
                ResponseEntity.internalServerError().build();
    }

    @GetMapping("/{testSetId}")
    public ResponseEntity<TestSet> getTestSetById(@PathVariable Long testSetId) {
        TestSet testSet = testSetService.getTestSetById(testSetId);
        return testSet != null ? ResponseEntity.ok(testSet) : ResponseEntity.notFound().build();
    }



    @GetMapping("/getAll")
    public ResponseEntity<List<TestSet>> getAllTestSets() {
        List<TestSet> testSets = testSetService.getAllTestSets();
//        System.out.println(testSets);
        return ResponseEntity.ok(testSets);
    }
    @GetMapping("/questionlist/{testTitle}")
    public List<Question> getQuestionsByTestTitle(@PathVariable String testTitle) {
        return testSetService.getQuestionsByTestTitle(testTitle);
    }
    @GetMapping("questions/{testSetId}")
    public List<Question> getQuestionsByTestId(@PathVariable Long testSetId) {
        return testSetService.getQuestionsByTestId(testSetId);
    }
    @GetMapping("/emailAddresses")
    public ResponseEntity<List<TestCredentialBody>> getEmailAddressesByTestSetTitle(@RequestParam  String testTitle) {
        List<TestCredentialBody> emailAddresses = testSetService.getEmailAddressesByTestTitle(testTitle);
        System.out.println(emailAddresses);
        if (!emailAddresses.isEmpty()) {
            return ResponseEntity.ok(emailAddresses);
        } else {
            // Handle the case where the test set with the given title is not found
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{testSetId}")
    public ResponseEntity<Void> deleteTestSet(@PathVariable Long testSetId) {
        testSetService.deleteTestSet(testSetId);
        return ResponseEntity.noContent().build();
    }
}

