package com.accolite.codelyzer.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
public class TestResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String candidateEmail;

//    @OneToMany(mappedBy = "testResponse", cascade = CascadeType.ALL)
//    private List<Option> solutionResponses = new ArrayList<>();

    private String startTime;
    private String finishTime;

    @ManyToOne
    @JoinColumn(name = "testSetId")
    @JsonBackReference
    private TestSet testSet;


    @OneToOne(mappedBy = "testResponse")
    @JsonBackReference
    private Candidate candidate;
    private Long score;

//    @OneToOne(mappedBy = "testResponse")
//    private TestCredentials testCredentials;
//    @ManyToMany(mappedBy = "testResponseList", cascade = CascadeType.ALL)
//    @JsonManagedReference
//    private List<Answer> answers;

//    @ElementCollection
//    @CollectionTable(name = "Verdicts", joinColumns = @JoinColumn(name = "id"))
//    @Column(name = "verdict")
//    private List<Boolean> verdicts;

    @ManyToMany
    @JsonBackReference
    @JoinTable(
            name = "question_testResponse",
            joinColumns = @JoinColumn(name = "id"),
            inverseJoinColumns = @JoinColumn(name = "question_id"))
    private List<Question> questions = new ArrayList<>();

    @OneToMany(mappedBy = "testResponse", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Option> ticked = new ArrayList<>();
    @Override
    public String toString() {
        return "TestResponse{" +
                "candidateEmail='" + candidateEmail + '\'' +
                ", startTime=" + startTime +
                ", finishTime=" + finishTime +
                ", candidate=" + candidate +
                '}';
    }
}
