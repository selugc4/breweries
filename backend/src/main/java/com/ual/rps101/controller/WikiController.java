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

//Controlador de la app que mapea la url en funcion del parametro "state", el cual, contiene el nombre del estado que se busca
@RestController
@RequestMapping("/state")
public class WikiController {
    @Autowired
    private WikiService wikiService;
    @GetMapping(path = "{state}")
    public ResponseEntity<Wiki> geWikiData(@PathVariable String state) {
        //Llamada a la funcion en base al parametro "state"
        return new ResponseEntity<Wiki>(wikiService.WikiService(state),
                HttpStatus.OK);
    }
}
