package com.accolite.codelyzer.repository;

import com.accolite.codelyzer.model.Option;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OptionRepo extends JpaRepository<Option, Long> {
}
