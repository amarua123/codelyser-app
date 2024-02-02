package com.accolite.codelyzer.service;
import org.springframework.http.ResponseEntity;
import java.util.Map;
public interface AuthService {
    ResponseEntity<Map<String, Object>> saveUser(String googleToken);
//    public String authenticateWithGoogle(String googleToken);
}
