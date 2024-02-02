package com.accolite.codelyzer.exceptions;

public class QuestionNotFoundException extends RuntimeException{
    public QuestionNotFoundException(String msg){
        super(msg);
    }
}
