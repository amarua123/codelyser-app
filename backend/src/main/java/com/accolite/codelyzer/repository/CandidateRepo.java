package com.accolite.codelyzer.repository;

import com.accolite.codelyzer.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidateRepo extends JpaRepository<Candidate, Long> {
    // You can add custom query methods if needed
    boolean existsByCandidateEmail(String candidateEmail);
    Candidate findByCandidateEmail(String candidateEmail);
}

