package com.example.Ciclo4_Mintic.repository.crudRepository;


import java.util.Optional;

import com.example.Ciclo4_Mintic.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;


public interface UserCrudRepository extends MongoRepository <User, Integer> {

    Optional<User> findByEmail(String email);

    @Query
    public User findByEmailAndPassword (String email, String password);

    //Para filtrar el usuario con el id mas alto
    Optional <User> findTopByOrderByIdDesc();
    
}


