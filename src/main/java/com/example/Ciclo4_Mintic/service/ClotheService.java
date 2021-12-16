package com.example.Ciclo4_Mintic.service;

import java.util.List;
import java.util.Optional;

import com.example.Ciclo4_Mintic.model.Clothe;
import com.example.Ciclo4_Mintic.repository.ClotheRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 
 * @autor fabianhr
 */
@Service
public class ClotheService {

    @Autowired
    private ClotheRepository clotheRepository;

    public List<Clothe> getAll(){
        return clotheRepository.getAll();
    }

    public Optional<Clothe> getById(String reference){
        return clotheRepository.getById(reference);
    }

    public Clothe registrar(Clothe clothe){
        if(clothe.getReference()== null)
            return clothe;
            Optional<Clothe> existeClothe = getById(clothe.getReference());

            if (existeClothe.isPresent())
            return clothe;
        
            return clotheRepository.save(clothe);

    }

    public Clothe update(Clothe clothe) {
        
        if (clothe.getReference() != null){
            Optional<Clothe> clotheDb = clotheRepository.getById(clothe.getReference());
            if (!clotheDb.isEmpty()){
                if(clothe.getCategory() != null){
                    clotheDb.get().setCategory(clothe.getCategory());            
                }
                if(clothe.getSize() != null){
                    clotheDb.get().setSize(clothe.getSize());            
                }
                if(clothe.getDescription() != null){
                    clotheDb.get().setDescription(clothe.getDescription());            
                }
                clotheDb.get().setPrice(clothe.getPrice());            
                
                if(clothe.getQuantity() != null){
                    clotheDb.get().setQuantity(clothe.getQuantity());            
                }
                if(clothe.getPhotography() != null){
                    clotheDb.get().setPhotography(clothe.getPhotography());            
                }
            clotheRepository.save(clotheDb.get());
            return clotheDb.get();
            }else{
                return clothe;
            }
        }else{
            return clothe;
        }
    }    

    


    public boolean deleteClothe(String reference){
        Boolean aBoolean = getById(reference).map(clothe ->{
            clotheRepository.delete(clothe);
            return true;    
        }).orElse(false);
        return aBoolean;
    }
    
}
