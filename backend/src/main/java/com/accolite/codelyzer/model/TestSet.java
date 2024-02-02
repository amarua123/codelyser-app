package com.accolite.codelyzer.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Entity
@Data
public class TestSet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long testSetId;

    private int BUId;
    @Column(columnDefinition = "TEXT", nullable = false)
    private String testSetTitle;

    private LocalDateTime creationDate;

    private LocalDateTime expiryDate;

//    private String testSetLink;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.REFRESH}, fetch = FetchType.EAGER)
    @JoinTable(
            name = "testSet_question",
            joinColumns = @JoinColumn(name = "testSetId"),
            inverseJoinColumns = @JoinColumn(name = "question_id"))
    @JsonBackReference
    private List<Question> questions = new ArrayList<>();

    @OneToMany(mappedBy = "testSet", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<TestCredentials> testCredentialsList = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "groupId")
    @JsonBackReference
    private Group group;


    @OneToMany(mappedBy = "testSet", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<TestResponse> testResponses = new ArrayList<>();

    @Override
    public String toString() {
        return "TestSet{" +
                "testSetId=" + testSetId +
                ", testSetTitle='" + testSetTitle + '\'' +
                ", creationDate=" + creationDate +
                ", expiryDate=" + expiryDate +
                '}';
    }
}