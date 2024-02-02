package com.accolite.codelyzer.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "testCredentials")
public class TestCredentials {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String emailAddress;
    private String name;
    private boolean linkSentStatus;
    private String expiryDate;
    private String startTime;

    @OneToOne(mappedBy = "testCredentials")
    @JsonBackReference
    private Candidate candidate;


    @ManyToOne
    @JoinColumn(name = "testSetId")
    @JsonBackReference
    private TestSet testSet;


    @ManyToMany
    @JsonBackReference
    @JoinTable(
            name = "testCredentials_question",
            joinColumns = @JoinColumn(name = "testCredential_id"),
            inverseJoinColumns = @JoinColumn(name = "question_id"))
    private List<Question> questions = new ArrayList<>();

    @Override
    public String toString() {
        return "TestCredentials{" +
                "id=" + id +
                ", emailAddress='" + emailAddress + '\'' +
                ", name='" + name + '\'' +
                ", linkSentStatus=" + linkSentStatus +
                ", expiryDate='" + expiryDate + '\'' +
                ", startTime='" + startTime + '\'' +
                ", candidate=" + candidate +
                ", testSet=" + testSet +
                ", questions=" + questions +
                '}';
    }

//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "id", referencedColumnName = "candidateEmail")
//    private TestResponse testResponse;
}
