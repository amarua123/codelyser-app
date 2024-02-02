package com.accolite.codelyzer.repository;

import com.accolite.codelyzer.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepo extends JpaRepository<Question, Long> {

}
