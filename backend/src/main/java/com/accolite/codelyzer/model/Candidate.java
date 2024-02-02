package com.accolite.codelyzer.model;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Data
@Table(name = "candidate")
public class Candidate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String candidateName;
    @Column(unique = true, nullable = false)
    private String candidateEmail;
    private String phoneNo;
//    private Integer YOE;
//    private String panNumber;
//    private String currentLocation;
//    private String interviewStatus;

//    @OneToOne(mappedBy = "candidate", cascade = CascadeType.ALL)
//    private TestResponse testResponse;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "testResponseEmail", referencedColumnName = "candidateEmail")
    @JsonManagedReference
    private TestResponse testResponse;

    @OneToOne(cascade = CascadeType.ALL)

//    @JoinColumn(name = "id", referencedColumnName = "id")

    @JoinColumn(name = "testCredentialEmail", referencedColumnName = "emailAddress")
    @JsonManagedReference
    private TestCredentials testCredentials;


    @Override
    public String toString() {
        return "Candidate{" +
                "id=" + id +
                ", candidateName='" + candidateName + '\'' +
                ", candidateEmail='" + candidateEmail + '\'' +
                ", phoneNo=" + phoneNo +
                '}';
    }
}
