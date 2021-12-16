package com.example.Ciclo4_Mintic.repository;

import java.util.List;
import java.util.Optional;

import com.example.Ciclo4_Mintic.model.Clothe;
import com.example.Ciclo4_Mintic.repository.crudRepository.ClotheCrudRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * 
 * @autor fabianhr
 */
@Repository
public class ClotheRepository {
    
    @Autowired
    private ClotheCrudRepository clotheCrudRepository;

    public List<Clothe> getAll(){
        return clotheCrudRepository.findAll();
        
    }

    public Optional <Clothe> getById(String reference){
        return clotheCrudRepository.findById(reference);
    }

    public Clothe save(Clothe clothe){
        return clotheCrudRepository.save(clothe);
    }

    public void delete(Clothe clothe){
        clotheCrudRepository.delete(clothe);

    }

}
