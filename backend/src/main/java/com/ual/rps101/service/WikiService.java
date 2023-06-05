package com.ual.rps101.service;
import com.ual.rps101.dto.Wiki;

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import org.springframework.stereotype.Component;

@Component("WikiService")
public class WikiService {

//Scrapping de la pagina de wikipedia para obtener la informacion de cada estado
    public Wiki WikiService(String state) {
        String text = "";
        try {
            //Conexion a la pagina de wikipedia
            Document webPage = Jsoup.connect("https://en.wikipedia.org/wiki/"+state).get();
            //Obtencion del primer parrafo
            Element information = webPage.getElementById("mw-content-text").getElementsByTag("p").get(1);
            //Insercion del parrafo en el atributo
            text = information.text();
            //Creacion del objeto Wiki con el texto obtenido
            Wiki wiki = new Wiki(text);
            return wiki;
        }catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
