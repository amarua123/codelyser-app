package com.accolite.codelyzer.requestbody;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
@Data
@Builder
public class TestResponseBody {

    private String candidateEmail;
    private List<Long> questionIds;
    private List<String> answers;
    private String startTime;
    private String finishTime;
    private Long testSetId;
    private Long candidateId;

}