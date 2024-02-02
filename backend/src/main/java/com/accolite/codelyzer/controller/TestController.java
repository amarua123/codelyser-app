package com.accolite.codelyzer.controller;


import com.accolite.codelyzer.model.Question;
import com.accolite.codelyzer.model.TestCredentials;
import com.accolite.codelyzer.requestbody.TestCredentialBody;
import com.accolite.codelyzer.service.QuestionService;
import com.accolite.codelyzer.service.TestCredentialsService;
import com.accolite.codelyzer.utils.ExcelReaderUtil;
//import com.accolite.codelyzer.utils.QuesExcelReader;
import com.accolite.codelyzer.utils.QuesExcelReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/tests")
@CrossOrigin(origins = "http://localhost:4200")
public class TestController {

    @Autowired
    private TestCredentialsService testCredentialsService;

    @Autowired
    private QuestionService questionService;

    @PostMapping("/create")
    public TestCredentials createTestCredentials(@RequestBody TestCredentialBody testCredentialBody) {
        return testCredentialsService.createTestCredentials(testCredentialBody);
    }



    @GetMapping("/all")
    public List<TestCredentials> getAllTestCredentials() {
        return testCredentialsService.getAllTestCredentials();
    }

    @GetMapping("/{testId}")
    public TestCredentials getTestCredentialsById(@PathVariable Long testId) {
        return testCredentialsService.getTestCredentialsById(testId);
    }

    @PutMapping("/update/{testId}")
    public TestCredentials updateTestCredentials(@PathVariable Long testId, @RequestBody TestCredentials updatedCredentials) {
        return testCredentialsService.updateTestCredentials(testId, updatedCredentials);
    }

    @DeleteMapping("/delete/{testId}")
    public void deleteTestCredentials(@PathVariable Long testId) {
        testCredentialsService.deleteTestCredentials(testId);
    }

//    @PostMapping("/upload-question")
//    public ResponseEntity<String> uploadQuestion(@RequestParam("file")MultipartFile file) throws IOException {
//        List<Question> questionList = QuesExcelReader.readFromExcel(file.getInputStream());
//        questionService.saveAll(questionList);
//        return ResponseEntity.ok("File Uploaded Success");
//    }

      @GetMapping("/candidate-emails")
      public List<String> getAllCandidateEmails() {
        return testCredentialsService.getAllCandidateEmails();
      }

      @GetMapping("/uploaded-candidate-data")
      public List<TestCredentialBody> getAllCandidateData(){
        return testCredentialsService.getAllCandidateData();
      }

      @GetMapping("/verify")
      public ResponseEntity<String> verifyCandidateByEmail(@RequestParam String emailAddress) {
          if (testCredentialsService.verifyCandidateByEmail(emailAddress)) {
              return ResponseEntity.ok("Candidate email verified successfully");
          } else {
              return ResponseEntity.badRequest().body("Candidate email verification failed");
          }
      }
}
