package com.example.Ciclo4_Mintic.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 
 * @autor fabianhr
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection="clothe")
public class Clothe {

    @Id
    private String reference;
    private String category;
    private String size;
    private String description;
    private boolean availability = true;
    private double price;
    private Integer quantity;
    private String photography;


    
}
