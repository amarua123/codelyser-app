package com.accolite.codelyzer.serviceimpl;


import com.accolite.codelyzer.model.Candidate;
import com.accolite.codelyzer.model.Question;
import com.accolite.codelyzer.model.TestResponse;
import com.accolite.codelyzer.repository.CandidateRepo;
import com.accolite.codelyzer.repository.QuestionRepo;
import com.accolite.codelyzer.repository.TestResponseRepo;
import com.accolite.codelyzer.requestbody.CandidateBody;
import com.accolite.codelyzer.service.CandidateService;
import com.accolite.codelyzer.service.TestCredentialsService;
import com.accolite.codelyzer.utils.PdfServiceUtil;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CandidateServiceImpl implements CandidateService {
    @Autowired
    private CandidateRepo candidateRepo;
    @Autowired
    private TestResponseRepo testResponseRepo;

    @Autowired
    QuestionRepo questionRepo;

    @Autowired
    private TestCredentialsService testCredentialsService;

    public List<Candidate> getAllCandidates() {
        return candidateRepo.findAll();
    }

    public Optional<Candidate> getCandidateById(Long id) {
        return candidateRepo.findById(id);
    }

    @Override
    public ResponseEntity<?> saveCandidate(CandidateBody candidateBody) {
        if (!testCredentialsService.verifyCandidateByEmail(candidateBody.getEmail())) {
            return ResponseEntity.badRequest().body("Email doesn't match with our records.");
        }
        if(testResponseRepo.existsByCandidateEmail(candidateBody.getEmail())){
            return ResponseEntity.badRequest().body("Your response have already saved !");
        }
        if(!candidateRepo.existsByCandidateEmail(candidateBody.getEmail())){
            // Email exist, proceed with candidate creation
            Candidate newCandidate = new Candidate();
            newCandidate.setCandidateName(candidateBody.getName());
            newCandidate.setCandidateEmail(candidateBody.getEmail());
            newCandidate.setPhoneNo(candidateBody.getPhoneNo());
            Candidate candidate = candidateRepo.save(newCandidate);
            // Save candidate
        }
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    @Override
    public void saveAll(List<Candidate> candidates) {
        candidateRepo.saveAll(candidates);
    }

    @Override
    public byte[] getReport(String candidateEmail) {
        TestResponse testResponse = testResponseRepo.findByCandidateEmail(candidateEmail);
        Candidate candidate = candidateRepo.findByCandidateEmail(candidateEmail);
        if(testResponse == null || candidate == null){
            return new byte[0];
        }
        CandidateBody candidateBody = new CandidateBody();
        candidateBody.setEmail(candidate.getCandidateEmail());
        candidateBody.setName(candidate.getCandidateName());
        candidateBody.setPhoneNo(candidate.getPhoneNo());
        List<Long> questionIds = new ArrayList<>();
        for(Question question: testResponse.getQuestions()){
            questionIds.add(question.getId());
        }
        return PdfServiceUtil.getReport(candidateBody, questionIds, testResponse.getTicked(), testResponse.getScore(), testResponse.getTestSet().getTestSetTitle(), questionRepo);
    }

//    public void deleteCandidate(Long id) {
//        candidateRepository.deleteById(id);
//    }
}