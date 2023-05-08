package com.ual.rps101.service;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import com.ual.rps101.dto.BotDTO;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import org.springframework.stereotype.Component;

@Component("BotImageService")
public class BotDTOService {

    private Playwright playwrightInstance;

    public BotDTOService() {
        super();
        this.playwrightInstance = Playwright.create();
    }

    public BotDTO retrieveBot() {
        Browser browserInstance = this.playwrightInstance.chromium().launch();

        var image = retrieveBotImage(browserInstance);
        var name = retrieveBotName(browserInstance);

        return new BotDTO(image, name);
    }

    private String retrieveBotName(Browser browser) {
        String name;

        Page page = browser.newPage();
        page.navigate("https://www.fantasynamegen.com/surnames/short/");
        page.waitForSelector(
                "#main > ul");

        Document webPage = Jsoup.parse(page.content());

        Element botName = webPage.select("ul > li").first();

        if (botName == null) {
            return null;
        }

        name = botName.text();

        page.close();

        return name;
    }

    public String retrieveBotImage(Browser browser) {

        String image;

        Page page = browser.newPage();
        page.navigate("https://getavataaars.com");
        page.waitForSelector(
                "#root > main > form > div:nth-child(12) > div");

        page.locator("button:text('Random')").click();

        page.locator("button:text('Show <img>')").click();

        page.waitForSelector("#root > main > div:nth-child(4) > textarea");

        Document webPage = Jsoup.parse(page.content());

        Element svg = webPage.select("textarea").first();

        if (svg == null) {
            return null;
        }
        var img = svg.text().split("src=");
        var src = img[1].replace("'", "");
        image = src;

        page.close();

        return image;

    }

}
