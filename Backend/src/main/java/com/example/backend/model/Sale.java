package com.example.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;


    @Temporal(TemporalType.TIMESTAMP)
    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date startDate;
    @PrePersist
    public void prePersist() {
        if (startDate == null) {
            startDate = new Date();
        }
    }

    private Date endDate;
    private Double discountPercent;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}
