package com.ual.rps101.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.ual.rps101.entity.Brewery;
@RepositoryRestResource
public interface BreweryRepository extends CrudRepository<Brewery, String> {
    //Permitir busqueda por nombre similar
    public List<Brewery> findByNameContainingIgnoreCase(String name);
}