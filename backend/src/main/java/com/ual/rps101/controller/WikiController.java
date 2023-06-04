package com.ual.rps101.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ual.rps101.dto.Wiki;
import com.ual.rps101.service.WikiService;

@RestController
@RequestMapping("/state")
public class WikiController {
    @Autowired
    private WikiService wikiService;
    @GetMapping(path = "{state}")
    public ResponseEntity<Wiki> geWikiData(@PathVariable String state) {
        return new ResponseEntity<Wiki>(wikiService.WikiService(state),
                HttpStatus.OK);
    }
}
