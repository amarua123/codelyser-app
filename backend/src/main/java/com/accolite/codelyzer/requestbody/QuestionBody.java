package com.accolite.codelyzer.requestbody;

import lombok.*;
import java.util.List;
@Data

public class QuestionBody {
    private Long id;
    private String description;
    private String descriptionWithCode;
    private String questionType;
    private String groupName;
    private List<String> tagSet;
    private List<String> options;
    private List<String> answers;
    private String tickChars; //A, B, C, ....
}
