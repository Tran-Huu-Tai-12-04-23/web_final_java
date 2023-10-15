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
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    private String name;
    private Double price;
    private Integer quantity;
    private String useage;
    private String screenSize;
    private String chipSet;
    @Column(columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean isDelete;

    @ManyToOne
    private Category category;

    @ManyToOne
    private TypeProduct typeProduct;

    @ManyToOne
    private Branch branch;
}
