package com.accolite.codelyzer.exceptions;

public class CandidateNotFoundException extends RuntimeException{
    public CandidateNotFoundException(String msg){
        super(msg);
    }
}
