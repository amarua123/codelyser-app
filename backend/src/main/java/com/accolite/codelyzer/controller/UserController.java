package com.accolite.codelyzer.controller;

import com.accolite.codelyzer.model.*;
import com.accolite.codelyzer.requestbody.QuestionBody;
import com.accolite.codelyzer.requestbody.UserBody;
import com.accolite.codelyzer.service.TestCredentialsService;
import com.accolite.codelyzer.service.UserService;
import com.accolite.codelyzer.utils.ExcelReaderUtil;
import com.accolite.codelyzer.utils.QuesExcelReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private TestCredentialsService testCredentialsService;
//    @GetMapping("/users")
//    public String listUsers(Model model) {
//        List<User> users = userService.getAllUsers();
//        model.addAttribute("users", users);
//        return "users/list";
//    }
    @PostMapping("getAllUsers")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    @PostMapping("createUser")
    public ResponseEntity<String> createUser(@RequestBody UserBody body) {
        User user = new User();
        System.out.println(body);
        user.setEmail(body.getEmail());
        user.setName(body.getName());
        user.setAccess(Access.valueOf(body.getAccess()));
        return userService.createUser(user) != null ?
                ResponseEntity.ok("User Created"):
                ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unable to Create the User");
    }
    @GetMapping("/{emailSubstring}")
    public List<User> getUsersByEmailSubstring(@PathVariable String emailSubstring) {
        return userService.getUsersByEmailSubstring(emailSubstring);
    }
    @PostMapping("createTag/{tagName}")
    public ResponseEntity<String> createTag(@PathVariable String tagName) {
        return userService.createTag(tagName) != null ?
                ResponseEntity.ok("Tag Created"):
                ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unable to Create the Tag");
    }

//    @PostMapping("createQuestion")
//    public String createQuestion(@RequestBody QuestionBody questionBody) {
//        userService.createQuestion(questionBody);
//        return "question created";
//    }
//    This api is in Question controller
//    @PostMapping("/upload-question")
//    public ResponseEntity<String> uploadQuestion(@RequestParam("file") MultipartFile file) throws IOException {
//        List<QuestionBody> questionList = QuesExcelReader.readFromExcel(file.getInputStream());
//        userService.createAllQuestions(questionList);
//        return ResponseEntity.ok("File Uploaded Success");
//    }
}
