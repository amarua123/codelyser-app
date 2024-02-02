package com.accolite.codelyzer.requestbody;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
@Data
@Builder
public class TestSetBody {

//    private int BUId;
    private String testTitle;
    private List<Long>questionIds;

//    private String testSetLink;
    private String creationDate;
    private String expiryDate;
}

