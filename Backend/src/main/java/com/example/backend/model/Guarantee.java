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
public class Guarantee {
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

    @ManyToOne
    @JoinColumn(name = "warranty_policy_id")
    private WarrantyPolicy warrantyPolicy;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;


    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

}
