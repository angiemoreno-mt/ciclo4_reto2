package com.example.Ciclo4_Mintic.repository;

import java.util.List;
import java.util.Optional;

import com.example.Ciclo4_Mintic.model.User;
import com.example.Ciclo4_Mintic.repository.crudRepository.UserCrudRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;



@Repository
public class UserRepository {
    
    @Autowired
    private UserCrudRepository userCrudRepository;

    public List<User> getAll(){
        return userCrudRepository.findAll();
    }

    public Optional <User> getById(Integer id){
        return userCrudRepository.findById(id);
    }

    public Boolean existeEmail(String email){
        Optional<User> usuario = userCrudRepository.findByEmail(email);
        return !usuario.isEmpty();
    }

    public User save(User user){
        return userCrudRepository.save(user);
    }

    public void delete(User user){
        userCrudRepository.delete(user);

    }

    public User autenticarUsuario(String email, String password){
        return userCrudRepository.findByEmailAndPassword(email, password);
    }

    public Optional <User> lastUserId(){
        return userCrudRepository.findTopByOrderByIdDesc();
    }

}
