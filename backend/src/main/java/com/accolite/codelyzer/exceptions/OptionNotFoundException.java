package com.accolite.codelyzer.exceptions;

public class OptionNotFoundException extends RuntimeException{
    public OptionNotFoundException(String msg){
        super(msg);
    }
}
