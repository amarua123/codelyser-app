package com.accolite.codelyzer.controller;

import com.accolite.codelyzer.config.JwtTokenService;
import com.accolite.codelyzer.model.GoogleTokenPayload;
import com.accolite.codelyzer.model.User;
import com.accolite.codelyzer.repository.UserRepo;
import com.accolite.codelyzer.requestbody.AuthTokenPayload;
import com.accolite.codelyzer.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    AuthService authService;
//    @PostMapping("/login")
//    public ResponseEntity<Map<String, Object>> saveUser(@RequestBody String googleToken) {
//        return authService.saveUser(googleToken);
////
//
//    }
//    @PostMapping("/login")
//        public ResponseEntity<String> googleSignIn(@RequestBody String googleToken) {
//        // Validate Google token, generate JWT token, and return it
//        String jwtToken = authService.authenticateWithGoogle(googleToken);
//        System.out.println(jwtToken);
//        return ResponseEntity.ok(jwtToken);
//    }

    @Autowired
    JwtTokenService jwtService;

    @Autowired
    UserRepo userRepository;

    private String googleTokenInfoUrl = "https://www.googleapis.com/oauth2/v3/tokeninfo";

    @PostMapping("/LoginWithGoogle")
    public ResponseEntity<Map<String, Object>> loginWithGoogle(@RequestBody String googleToken) {
        try {
            // Validate Google token
            String tokenPayload = validateGoogleToken(googleToken);
            String email = validateEmail(googleToken);


            if (tokenPayload != null) {
                Map<String, Object> responseMap = new HashMap<>();
                responseMap.put("status", "success");
                responseMap.put("tokenPayload", tokenPayload);
                responseMap.put("email", email);
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

    private String validateGoogleToken(String googleToken){
        RestTemplate restTemplate = new RestTemplate();
//          System.out.println(googleToken);
        String jwtToken;

        String accessTokenValue = googleToken.substring(1);

        String tokenInfoUrl = googleTokenInfoUrl + "?id_token=" + accessTokenValue;
        ResponseEntity<GoogleTokenPayload> response = restTemplate.getForEntity(tokenInfoUrl, GoogleTokenPayload.class);

        // System.out.println(response.getBody().getEmail()); To get the email

        if (response.getStatusCode() == HttpStatus.OK) {
            jwtToken = jwtService.generateJWTToken( userRepository.findByEmail(response.getBody().getEmail()));
            System.out.println(jwtToken);
            return jwtToken;
        } else {
            return null;
        }
    }

    private String validateEmail(String googleToken){
        RestTemplate restTemplate = new RestTemplate();
        //  System.out.println(googleToken);

        String accessTokenValue = googleToken.substring(1);

        String tokenInfoUrl = googleTokenInfoUrl + "?id_token=" + accessTokenValue;
        ResponseEntity<GoogleTokenPayload> response = restTemplate.getForEntity(tokenInfoUrl, GoogleTokenPayload.class);

        // System.out.println(response.getBody().getEmail()); To get the email

        if (response.getStatusCode() == HttpStatus.OK) {
            return response.getBody().getEmail();
        } else {
            return null;
        }
    }

    @PostMapping("/getAuthToken")
    private ResponseEntity<AuthTokenPayload> getAuthToken(@RequestBody String googleToken){
        RestTemplate restTemplate = new RestTemplate();
        //  System.out.println(googleToken);
        String jwtToken;

        String accessTokenValue = googleToken.substring(1);

        String tokenInfoUrl = googleTokenInfoUrl + "?id_token=" + accessTokenValue;
        ResponseEntity<GoogleTokenPayload> response = restTemplate.getForEntity(tokenInfoUrl, GoogleTokenPayload.class);

        AuthTokenPayload authTokenPayload = new AuthTokenPayload();
        // System.out.println(response.getBody().getEmail()); To get the email

        if (response.getStatusCode() == HttpStatus.OK) {
            jwtToken = jwtService.generateJWTToken(userRepository.findByEmail(Objects.requireNonNull(response.getBody()).getEmail()));
            authTokenPayload.setJwtToken(jwtToken);
            return ResponseEntity.ok(authTokenPayload);
        } else {
            return null;
        }
    }

    @PostMapping("/getEmail")
    private ResponseEntity<GoogleTokenPayload> Email(@RequestBody String googleToken){
        RestTemplate restTemplate = new RestTemplate();
        //  System.out.println(googleToken);

        String accessTokenValue = googleToken.substring(1);

        String tokenInfoUrl = googleTokenInfoUrl + "?id_token=" + accessTokenValue;
        ResponseEntity<GoogleTokenPayload> response = restTemplate.getForEntity(tokenInfoUrl, GoogleTokenPayload.class);

        // System.out.println(response.getBody().getEmail()); To get the email

        if (response.getStatusCode() == HttpStatus.OK) {
            return response;
        } else {
            return null;
        }
    }

    @PostMapping("/getUser")
    private ResponseEntity<User> User(@RequestBody String googleToken){
        RestTemplate restTemplate = new RestTemplate();
        //  System.out.println(googleToken);

        String accessTokenValue = googleToken.substring(1);

        String tokenInfoUrl = googleTokenInfoUrl + "?id_token=" + accessTokenValue;
        ResponseEntity<GoogleTokenPayload> response = restTemplate.getForEntity(tokenInfoUrl, GoogleTokenPayload.class);

        User user = userRepository.findByEmail(response.getBody().getEmail());
        // System.out.println(response.getBody().getEmail()); To get the email

        if (response.getStatusCode() == HttpStatus.OK) {
            return ResponseEntity.ok(user);
        } else {
            return null;
        }
    }
    @PostMapping("/checkEmail")
    public ResponseEntity<Boolean> checkEmailExists(@RequestBody GoogleTokenPayload googleTokenPayload) {
        User emailExists = userRepository.findByEmail(googleTokenPayload.getEmail());
//        System.out.println(googleTokenPayload.getEmail());
        boolean exists = false;
        if (emailExists!= null) {
            exists = true;
        }
        return ResponseEntity.ok(exists);
    }
}