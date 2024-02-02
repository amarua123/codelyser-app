package com.accolite.codelyzer.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Objects;

@Entity
@Data
@Table(name = "options")
public class Option {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Character ansCh; //  A, B, C ... etc
    @Column(columnDefinition = "TEXT")
    private String optionText;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "questionId")
    private Question question;

    @ManyToOne
    @JoinColumn(name = "testResponseId")
    @JsonBackReference
    private TestResponse testResponse;

//    @ManyToOne
//    @JoinColumn(name = "candidateEmail")
//    private TestResponse testResponse;

    @Override
    public String toString() {
        return "Option{" +
                "id=" + id +
                ", optionText='" + optionText + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Option option = (Option) o;
        return Objects.equals(optionText, option.optionText);
    }

    @Override
    public int hashCode() {
        return Objects.hash(optionText);
    }
}
