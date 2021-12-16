package com.example.Ciclo4_Mintic.repository.crudRepository;

import com.example.Ciclo4_Mintic.model.Clothe;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ClotheCrudRepository extends  MongoRepository <Clothe, String>{
    
}
