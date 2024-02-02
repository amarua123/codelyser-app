package com.accolite.codelyzer.serviceimpl;

import com.accolite.codelyzer.config.JwtTokenService;
import com.accolite.codelyzer.model.Access;
import com.accolite.codelyzer.model.GoogleTokenPayload;
import com.accolite.codelyzer.model.User;
import com.accolite.codelyzer.repository.UserRepo;
import com.accolite.codelyzer.service.AuthService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
@Transactional
public class AuthServiceImpl implements AuthService {

    @Autowired
    UserRepo userRepository;
    @Autowired
    JwtTokenService jwtTokenService;
    private final String googleTokenInfoUrl = "https://www.googleapis.com/oauth2/v3/tokeninfo";
    @Override
    public ResponseEntity<Map<String, Object>> saveUser(String googleToken) {
        try {
            // Validate Google token
            String access = validateGoogleToken(googleToken);

            if (access != null) {
                Map<String, Object> responseMap = new HashMap<>();
                responseMap.put("status", "success");
                responseMap.put("tokenPayload", googleToken);
                responseMap.put("access", access);
                return ResponseEntity.ok(responseMap);
            } else {
                Map<String, Object> errorMap = new HashMap<>();
                errorMap.put("status", "error");
                errorMap.put("message", "Invalid Google token");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorMap);
            }
        } catch (Exception e) {
            Map<String, Object> errorMap = new HashMap<>();
            errorMap.put("status", "error");
            errorMap.put("message", "An error occurred");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMap);
        }
    }
//    public String authenticateWithGoogle(String googleToken) {
//        RestTemplate restTemplate = new RestTemplate();
//        //  System.out.println(googleToken);
//        String tokenInfoUrl = googleTokenInfoUrl + "?id_token=" + googleToken;
//        ResponseEntity<GoogleTokenPayload> response = restTemplate.getForEntity(tokenInfoUrl, GoogleTokenPayload.class);
//        System.out.println(response.getBody());
//        String userEmail = Objects.requireNonNull(response.getBody()).getEmail();
//
//        // Extract user email from token
//
//        // Generate JWT token
//        return jwtTokenService.generateToken(userEmail);
//    }

    private String validateGoogleToken(String googleToken){
        RestTemplate restTemplate = new RestTemplate();
        //  System.out.println(googleToken);
        String tokenInfoUrl = googleTokenInfoUrl + "?id_token=" + googleToken;
        ResponseEntity<GoogleTokenPayload> response = restTemplate.getForEntity(tokenInfoUrl, GoogleTokenPayload.class);
        System.out.println(response.getBody());
        // System.out.println(response.getBody().getEmail()); To get the email

        if(response.getBody()!=null)
        {
            String email = response.getBody().getEmail();
            User user = userRepository.findByEmail(email);
//                    .orElse(null);

//            if(user==null){
//                var userEntry = User.builder().email(response.getBody().getEmail()).build();
//                userRepository.save(userEntry);
//            }
            if(user != null && response.getStatusCode() == HttpStatus.OK){
                if(user.getAccess() == Access.ADMIN){
                    return "admin";
                }else if(user.getAccess() == Access.GROUP){
                    return "group";
                }else{
                    return "other";
                }
            }else{
                return null;
            }

        }else{
            return null;
        }

//        if (response.getStatusCode() == HttpStatus.OK) {
//            return googleToken;
//        } else {
//            return null;
//        }
    }

}
