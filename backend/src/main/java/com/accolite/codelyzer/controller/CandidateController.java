package com.accolite.codelyzer.controller;


import com.accolite.codelyzer.exceptions.TestSetNotFoundException;
import com.accolite.codelyzer.model.Candidate;
import com.accolite.codelyzer.model.TestCredentials;
import com.accolite.codelyzer.repository.TestCredentialsRepo;
import com.accolite.codelyzer.repository.TestSetRepo;
import com.accolite.codelyzer.requestbody.CandidateBody;
import com.accolite.codelyzer.service.CandidateService;
import com.accolite.codelyzer.service.TestCredentialsService;
import com.accolite.codelyzer.utils.CandidateExcelReader;
import com.accolite.codelyzer.utils.ExcelReaderUtil;
import com.accolite.codelyzer.utils.PdfServiceUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/candidates")
@CrossOrigin(origins = "http://localhost:4200")
public class CandidateController {
    @Autowired
    private CandidateService candidateService;

    @Autowired
    private TestCredentialsService testCredentialsService;

    @Autowired
    TestSetRepo testSetRepo;
    @Autowired
    TestCredentialsRepo testCredentialsRepo;


    @GetMapping("/getAll")
    public ResponseEntity<List<Candidate>> getAllCandidates() {
        List<Candidate> candidates = candidateService.getAllCandidates();

        if (candidates.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(candidates, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Candidate> getCandidateById(@PathVariable Long id) {
        Optional<Candidate> candidate = candidateService.getCandidateById(id);
        return candidate.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/createCandidate")
    public ResponseEntity<?> saveCandidate(@RequestBody CandidateBody candidateBody) {
        ResponseEntity<?> response = candidateService.saveCandidate(candidateBody);
//        System.out.println(response);
        if (response.getStatusCode() == HttpStatus.CREATED) {
            return ResponseEntity.ok(response.getBody());
        } else {
            return ResponseEntity.badRequest().body(response.getBody());
        }
    }


//    @PostMapping("/upload-candidate")
//    public ResponseEntity<String> uploadCandidate(@RequestParam("file")MultipartFile file) throws IOException {
//            List<Candidate> candidates = CandidateExcelReader.processExcelFile(file.getInputStream());
//            //System.out.println(candidates);
//            candidateService.saveAll(candidates);
//        return ResponseEntity.ok("File Uploaded Success");
//    }


//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteCandidate(@PathVariable Long id) {
//        candidateService.deleteCandidate(id);
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }

    @GetMapping("downloadTestReport/{candidateEmail}")
    public ResponseEntity<byte[]> downloadTestReport(@PathVariable String candidateEmail) {

        byte[] pdfBytes = candidateService.getReport(candidateEmail);
        // Generate PDF

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "report.pdf");

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }

    @PostMapping("/upload-candidate-credentials-forTest")
    public ResponseEntity<String> uploadTestCredentials(@RequestParam("file")MultipartFile file){
        List<TestCredentials> testCredentials = null;
        try {
            testCredentials = ExcelReaderUtil.readCandidatesFromExcel(file.getInputStream(), testSetRepo, testCredentialsRepo);
        }catch (NumberFormatException e){
            return ResponseEntity.badRequest().body("expecting id of the testSet in numeric format");
        }catch (TestSetNotFoundException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IOException e) {
//            throw new RuntimeException(e);
            return ResponseEntity.badRequest().body("something is wrong with the selected file");
        }
        testCredentialsService.saveAll(testCredentials);
        return ResponseEntity.ok("File Uploaded Success");
    }

}


