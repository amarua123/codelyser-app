package com.accolite.codelyzer.service;

import com.accolite.codelyzer.model.Candidate;
import com.accolite.codelyzer.requestbody.CandidateBody;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface CandidateService {

    List<Candidate> getAllCandidates();
    Optional<Candidate> getCandidateById(Long id);
    ResponseEntity<?> saveCandidate(CandidateBody candidateBody);
    void saveAll(List<Candidate> candidates);
    byte[] getReport(String candidateEmail);
}