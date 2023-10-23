package com.example.backend.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ElementCollection
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_link")
    private List<String> linkImages;

    private String linkVideo;
    private String description;
    private String contentReview;
    private String name;
    private Double price;
    private Integer quantity;
    private String useage;
    private String screenSize;
    private String chipSet;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date createAt;


    @Column(columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean isDelete;
    @PrePersist
    public void prePersist() {
        if (createAt == null) {
            createAt = new Date();
        }
        if( isDelete == null ) {
            isDelete = false;
        }
    }

    @ManyToOne
    private Category category;

    @ManyToOne
    private Branch branch;

}
