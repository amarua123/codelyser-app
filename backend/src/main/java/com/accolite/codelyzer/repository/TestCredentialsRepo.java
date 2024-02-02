package com.accolite.codelyzer.repository;

import com.accolite.codelyzer.model.Question;
import com.accolite.codelyzer.model.TestCredentials;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TestCredentialsRepo extends JpaRepository<TestCredentials, Long> {

    boolean existsByEmailAddress(String emailAddress);
    TestCredentials findByEmailAddress(String candidateEmail);
    @Transactional
    @Modifying
    @Query("UPDATE TestCredentials t SET t.linkSentStatus = true WHERE t.emailAddress = ?1")
    int updateLinkSentStatusByEmail(String emailAddress);
}
