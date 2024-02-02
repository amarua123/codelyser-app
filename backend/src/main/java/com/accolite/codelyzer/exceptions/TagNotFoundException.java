package com.accolite.codelyzer.exceptions;

public class TagNotFoundException extends RuntimeException{
    public TagNotFoundException(String msg){
        super(msg);
    }
}
