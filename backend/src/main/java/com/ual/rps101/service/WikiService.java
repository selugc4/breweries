package com.ual.rps101.service;
import com.ual.rps101.dto.Wiki;

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import org.springframework.stereotype.Component;

@Component("WikiService")
public class WikiService {


    public Wiki WikiService(String state) {
        String text = "";
        try {
            Document webPage = Jsoup.connect("https://en.wikipedia.org/wiki/"+state).get();
            Element information = webPage.getElementById("mw-content-text").getElementsByTag("p").get(1);
            text = information.text();
            Wiki wiki = new Wiki(text);
            return wiki;
        }catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
