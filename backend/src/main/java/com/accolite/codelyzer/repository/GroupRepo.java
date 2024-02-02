package com.accolite.codelyzer.repository;

import com.accolite.codelyzer.model.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GroupRepo extends JpaRepository<Group, Long> {

    Group findByGroupName(String groupName);
}
