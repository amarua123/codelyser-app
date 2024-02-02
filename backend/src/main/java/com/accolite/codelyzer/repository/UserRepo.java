package com.accolite.codelyzer.repository;

import com.accolite.codelyzer.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepo extends JpaRepository<User,String> {
    User findByEmail(String email);
//    Optional<User> findByEmailAddress(String email);

    List<User> findByEmailContaining(String emailSubstring);
}
