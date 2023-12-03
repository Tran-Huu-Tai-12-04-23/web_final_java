package com.example.backend.model;


import jakarta.persistence.*;
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
    private String touchScreen;
    @Column(columnDefinition = "LONGTEXT")
    private String screenSize;
    @Column(columnDefinition = "LONGTEXT")
    private String resolution;
    private String webcam;
    private String OS;
    private String wifi;
    private String bluetooth;
    private String powerCapacity;
    @Column(columnDefinition = "LONGTEXT")
    private String portSupport;
}