package com.ual.rps101.dto;

public class Wiki {
    private String text;


    public Wiki(String text){
        this.text = text;
    }    
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
    
}
