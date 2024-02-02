package com.accolite.codelyzer.requestbody;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
@Data
public class TestCredentialBody {
    private String emailAddress;
    private String name;
    private boolean linkSentStatus;
    private String expiryDate;
    private String startTime;
    private Long testId;
    private String testTitle;
    private Long score;

}
