package com.accolite.codelyzer.controller;


import com.accolite.codelyzer.requestbody.EmailRequest;
import com.accolite.codelyzer.utils.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class EmailController {

    @Autowired
    private EmailService emailService;

    // API to send individual emails
    @RequestMapping(value = "/sendemail", method = RequestMethod.POST)
    public ResponseEntity<?> sendEmail(@RequestBody EmailRequest request) {
        System.out.println(request);
        boolean result = this.emailService.sendEmail(request.getSubject(), request.getMessage(), request.getTo());
        if (result) {
            return ResponseEntity.ok("Email Sent Successfully...");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Email not sent");
        }
    }

    // API to send bulk emails
    @RequestMapping(value = "/sendbulkemails", method = RequestMethod.POST)
    public ResponseEntity<?> sendBulkEmails(@RequestBody List<EmailRequest> requests) {
//        System.out.println(requests);
        boolean result = this.emailService.sendBulkEmails(requests);
        if (result) {
            return ResponseEntity.ok("Bulk Emails Sent Successfully...");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Bulk Emails not sent");
        }
    }
}

