package com.accolite.codelyzer.requestbody;

import jakarta.persistence.Entity;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OptionBody {

    private Long id;
    private String optionText;
    private boolean correct;
}