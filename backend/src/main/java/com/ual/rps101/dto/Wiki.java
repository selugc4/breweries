package com.ual.rps101.dto;

//Tabla de datos remota
public class Wiki {
    //Unico atributo para el texto del parrafo
    private String text;
    private Wiki(){
    }
    //Constructor con el atributo
    public Wiki(String text){
        this.text = text;
    }
    //Getter y setter del atributo  
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
    
}
