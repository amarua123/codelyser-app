package com.accolite.codelyzer.controller;

import com.accolite.codelyzer.model.Question;
import com.accolite.codelyzer.requestbody.AnswerResponseBody;
import com.accolite.codelyzer.requestbody.QuestionBody;
import com.accolite.codelyzer.service.QuestionService;
import com.accolite.codelyzer.service.TestResponseService;
import com.accolite.codelyzer.service.UserService;
import com.accolite.codelyzer.utils.QuesExcelReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/question")
@CrossOrigin(origins = "http://localhost:4200")
public class QuestionController {
    @Autowired
    UserService userService;
    @Autowired
    QuestionService questionService;
    @Autowired
    TestResponseService testResponseService;

    @GetMapping("/get-all-questions")
    public List<QuestionBody> getAllQuestions() {
        System.out.println("In getQuestions ckntrollert");
        return questionService.getAllQuestions();
    }

    @PostMapping("createQuestion")
    public ResponseEntity<String> createQuestion(@RequestBody QuestionBody questionBody) {
        userService.createQuestion(questionBody);
//        System.out.println(questionBody);
        return ResponseEntity.ok("question created");
    }

    @PostMapping("/upload-question")
    public ResponseEntity<String> uploadQuestion(@RequestParam("file") MultipartFile file) throws IOException {
        List<QuestionBody> questionList = QuesExcelReader.readFromExcel(file.getInputStream());
        userService.createAllQuestions(questionList);
        return ResponseEntity.ok("File Uploaded Success");


    }

    @PostMapping("/submit-answers")
    public ResponseEntity<String> answerResponse(@RequestBody AnswerResponseBody payload) {
        if(payload.getEmail() == null || payload.getEmail().trim().isEmpty()){
            return ResponseEntity.badRequest().body("Email-Address is missing");
        }else if(payload.getAnswers() == null || payload.getAnswers().isEmpty()){
            return ResponseEntity.badRequest().body("Answers are missing");
        }else if(payload.getQuestionIds() == null || payload.getQuestionIds().isEmpty()){
            return ResponseEntity.badRequest().body("Question Ids are missing");
        }
//        System.out.println(payload);
       testResponseService.saveResponse(payload);
        return new ResponseEntity<>("Answers received successfully", HttpStatus.OK);
    }
    @GetMapping("/get-sets-question")
    public List<QuestionBody> getSetsQuestions(@RequestParam String email) {
        return questionService.getQuestionOfSets(email);
    }

}


