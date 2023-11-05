package com.example.backend.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Fetch;

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

    private String color;
    private String linkVideo;
    private String imageLinkThumbnail;
    private String description;
    private String shortDescription;
    private String name;
    private Double price;
    private Integer quantity;
    private String screenSize;
    private String chipSet;
    private Date launchDate;

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date datePublished;
    @Column(columnDefinition = "BOOLEAN DEFAULT 0")
    private Integer status;

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
        if( datePublished == null ) {
            datePublished = new Date();
        }
        if( isDelete == null ) {
            isDelete = false;
        }
        if( status == null  ) {
            status = 1;
        }
    }

    @ManyToOne
    private Category category;

    @ManyToOne
    private ProductSpecification productSpecification;

    @ManyToOne
    private Branch branch;

}
