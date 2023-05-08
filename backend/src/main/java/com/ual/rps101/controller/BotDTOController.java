package com.ual.rps101.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ual.rps101.dto.BotDTO;
import com.ual.rps101.service.BotDTOService;

@RestController
@RequestMapping("/bot")
public class BotDTOController {
    @Autowired
    private BotDTOService botImageService;

    @GetMapping("data")
    public ResponseEntity<BotDTO> getBotData() {
        return new ResponseEntity<BotDTO>(botImageService.retrieveBot(),
                HttpStatus.OK);
    }
}
