package com.accolite.codelyzer.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.*;

@Entity
@Data
@Table(name = "question")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;
    @Column(columnDefinition = "TEXT")
    private String descriptionWithCode;//richTextDescription
    private String questionType;//enum
    @ManyToMany
    @JsonBackReference
    @JoinTable(
            name = "question_groups",
            joinColumns = @JoinColumn(name = "question_id"),
            inverseJoinColumns = @JoinColumn(name = "groupId"))
    private List<Group> groups;//many to one

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.REFRESH}, fetch = FetchType.EAGER)
    @JsonBackReference
    @JoinTable(
            name = "question_tag",
            joinColumns = @JoinColumn(name = "question_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    Set<Tag> tagSet = new HashSet<>();

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Option> options = new ArrayList<>();
    private String answer;  //A, B, C, ....

//    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
//    @JsonManagedReference
//    private List<Answer> correctAnswer = new ArrayList<>();

//    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
//    private List<Answer> answers = new ArrayList<>();


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Question question = (Question) o;
        return Objects.equals(id, question.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @ManyToMany(mappedBy = "questions")
    @JsonManagedReference
    private List<TestSet> testSets = new ArrayList<>();

    @Override
    public String toString() {
        return "Question{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", questionType='" + questionType + '\'' +
//                ", tagSet=" + tagSet +
                ", options=" + options +
//                ", answers=" + correctAnswer +
//                ", testSets=" + testSets +
//                ", testCredentials=" + testCredentials +
                '}';
    }
    @ManyToMany(mappedBy = "questions", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<TestCredentials> testCredentialsList;

    @ManyToMany(mappedBy = "questions", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<TestResponse> testResponseList;

}