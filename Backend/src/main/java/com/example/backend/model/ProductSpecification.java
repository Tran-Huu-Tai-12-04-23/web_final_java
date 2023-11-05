package com.example.backend.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductSpecification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String typeCard;
    private String typeCPU;
    private String ramCapacity;
    private String typeRam;
    private String hardDrive;
    private String material;
    private Boolean touchScreen;
    private String screenSize;
    private String resolution;
    private String webcam;
    private String OS;
    private String wf;
    private String bluetooth;
    private String powerCapacity;
    private String portSupport;
}
