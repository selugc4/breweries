package com.ual.rps101.repository;

import com.ual.rps101.entity.Deck;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;

@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE, RequestMethod.OPTIONS }, exposedHeaders = {
                "Access-Control-Allow-Origin",
                "Access-Control-Allow-Headers",
                "Access-Control-Allow-Methods" })

@RepositoryRestResource
public interface DeckRepository extends CrudRepository<Deck, Long> {
    public List<Deck> findByNameContainingIgnoreCase(@Param("name") String name);
}