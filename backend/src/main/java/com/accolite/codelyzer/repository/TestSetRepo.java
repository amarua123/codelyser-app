package com.accolite.codelyzer.repository;

import com.accolite.codelyzer.model.TestSet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TestSetRepo extends JpaRepository<TestSet, Long> {

    Optional<TestSet> findByTestSetTitle(String testSetTitle);

}
