package com.example.Ciclo4_Mintic.service;

import java.util.List;
import java.util.Optional;

import com.example.Ciclo4_Mintic.model.User;
import com.example.Ciclo4_Mintic.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAll(){
        return userRepository.getAll();
    }

    public Optional<User> getById(Integer id){
        return userRepository.getById(id);
    }

    public Boolean existeEmail(String email){
        return userRepository.existeEmail(email);
    }

    public User registrar(User user){

        //Obiene el maximo id existente en lacolección
        Optional<User> userIdMaximo = userRepository.lastUserId();

        //Si el id que me envian como parametro tiene un id nulo, entonces valida el maximo id en la base de usuarios
        if (user.getId() == null){
            //valida el maximo id generado, si no hay nunguno aun, el primer id sera 1
            if (userIdMaximo.isEmpty())
            user.setId(1);
            else
                user.setId(userIdMaximo.get().getId() + 1);
            }
        
            Optional<User> e = userRepository.getById(user.getId());
            if (e.isEmpty()){
                if (existeEmail(user.getEmail()) == false){
                    return userRepository.save(user);
                }else{
                    return user;
                }
            }else{
                return user;
                }
            }

            
    public User update (User user){

        if (user.getId() != null){
            Optional<User> userDb = userRepository.getById(user.getId());
            if (!userDb.isEmpty()){
                if (user.getIdentification() != null){
                    userDb.get().setIdentification(user.getIdentification());
                }
                if (user.getName() != null){
                    userDb.get().setName(user.getName());
                }
                if (user.getAddress() != null){
                    userDb.get().setAddress(user.getAddress());
                }
                if (user.getCellPhone() != null){
                    userDb.get().setCellPhone(user.getCellPhone());
                }
                if (user.getEmail() != null){
                    userDb.get().setEmail(user.getEmail());
                }
                if (user.getPassword() != null){
                    userDb.get().setPassword(user.getPassword());
                }
                if (user.getZone() != null){
                    userDb.get().setZone(user.getZone());
                }
                if (user.getType() != null){
                    userDb.get().setType(user.getType());
                }
            userRepository.save(userDb.get());
            return userDb.get();
        }else{
            return user;
        }
    }else{
        return user;
    }
}
   




    public boolean deleteUser(Integer id){
        Boolean aBoolean = getById(id).map(user ->{
            userRepository.delete(user);
            return true;    
        }).orElse(false);
        return aBoolean;
    }
    

    




    
    public User autenticarUsuario(String email, String password){
    User user = userRepository.autenticarUsuario(email, password);
    User validacionFallida = new User();

    if(user == null){
        return validacionFallida;
    }else{
        return user;
    }
}
    
}
