package com.accolite.codelyzer.requestbody;

import com.accolite.codelyzer.model.Access;
import lombok.Data;

@Data
public class UserBody {
    private String name;
    private String email;
    private String access;
}
