package com.accolite.codelyzer.controller;

import com.accolite.codelyzer.model.TestResponse;
import com.accolite.codelyzer.requestbody.TestResponseBody;
import com.accolite.codelyzer.service.TestResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/testResponse")
@CrossOrigin(origins = "http://localhost:4200")
public class TestResponseController {
    @Autowired
    private TestResponseService testResponseService;

    @PostMapping("/create")
    public ResponseEntity<TestResponse> createTestResponse(@RequestBody TestResponseBody testResponseBody) {
        TestResponse savedTestResponse = testResponseService.saveTestResponse(testResponseBody);
        return new ResponseEntity<>(savedTestResponse, HttpStatus.CREATED);
    }

    @GetMapping("/{candidateEmail}")
    public ResponseEntity<TestResponse> getTestResponseByEmail(@PathVariable String candidateEmail) {
        TestResponse testResponse = testResponseService.getTestResponseByEmail(candidateEmail);
        return testResponse != null ? ResponseEntity.ok(testResponse) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<TestResponse>> getAllTestResponses() {
        List<TestResponse> testResponses = testResponseService.getAllTestResponses();
        return ResponseEntity.ok(testResponses);
    }

    @DeleteMapping("/{candidateEmail}")
    public ResponseEntity<Void> deleteTestResponse(@PathVariable String candidateEmail) {
        testResponseService.deleteTestResponse(candidateEmail);
        return ResponseEntity.noContent().build();
    }
//    To store the test response of the candidate
//    @PostMapping("/save-response")
//    public ResponseEntity<String> saveTestResponse(@RequestBody TestResponseBody testResponseBody)
//    {
//        return ResponseEntity.ok("Response Saved");
//    }

    @GetMapping("/getAllScores/{testSetTitle}")
    public ResponseEntity<List<Long>> getScoresByTestSetTitle(@PathVariable String testSetTitle) {
        List<Long> scores = testResponseService.getScoresByTestSetTitle(testSetTitle);
        return new ResponseEntity<>(scores, HttpStatus.OK);
    }
}

