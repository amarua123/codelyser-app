package com.accolite.codelyzer.requestbody;

import lombok.Data;

import java.util.List;

@Data
public class AnswerResponseBody {
    private String email;
    private List<String> answers;
    private List<Long> questionIds;
    private String startTime;
    private String finishTime;
    // Getters and Setters
}

