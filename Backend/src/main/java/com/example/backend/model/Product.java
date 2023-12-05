package com.example.backend.model;


import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    @Column(columnDefinition = "LONGTEXT")
    private String linkVideo;
    @Column(columnDefinition = "LONGTEXT")
    private String thumbnails;
    @Column(columnDefinition = "LONGTEXT")
    private String description;
    private String shortDescription;
    private String name;
    private Double price;
    private Integer quantity;
    @Column(columnDefinition = "LONGTEXT")
    private String screenSize;
    private String chipSet;
    private Date launchDate;
    private String color;

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date datePublished;
    @Column(columnDefinition = "BOOLEAN DEFAULT true")
    private Boolean status;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date createAt;

    @Column(columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean isDelete;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ReviewOrder> reviewOrders;
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
            status = true;
        }

    }

    @ManyToOne
    private Category category;

    @ManyToOne
    private ProductSpecification productSpecification;

    @ManyToOne
    private Brand brand;

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", linkImages=" + linkImages +
                ", linkVideo='" + linkVideo + '\'' +
                ", thumbnails='" + thumbnails + '\'' +
                ", description='" + description + '\'' +
                ", shortDescription='" + shortDescription + '\'' +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", quantity=" + quantity +
                ", screenSize='" + screenSize + '\'' +
                ", chipSet='" + chipSet + '\'' +
                ", launchDate=" + launchDate +
                ", color='" + color + '\'' +
                ", datePublished=" + datePublished +
                ", status=" + status +
                ", createAt=" + createAt +
                ", isDelete=" + isDelete +
                ", category=" + category +
                ", productSpecification=" + productSpecification.toString() +
                ", branch=" + brand +
                '}';
    }


}
