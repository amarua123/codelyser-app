package com.accolite.codelyzer.repository;

import com.accolite.codelyzer.model.Question;
import com.accolite.codelyzer.model.TestResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TestResponseRepo extends JpaRepository<TestResponse, String> {
    TestResponse findByCandidateEmail(String candidateEmail);
    boolean existsByCandidateEmail(String candidateEmail);
    @Query("SELECT tr.score FROM TestResponse tr " +
            "WHERE tr.testSet.testSetId = :testSetId")
    List<Long> findScoresByTestSetId(@Param("testSetId") Long testSetId);


}
