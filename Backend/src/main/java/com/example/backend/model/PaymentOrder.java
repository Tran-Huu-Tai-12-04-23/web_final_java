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
public class PaymentOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    private boolean typeOrder;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date createAt;
    @PrePersist
    public void prePersist() {
        if (createAt == null) {
            createAt = new Date();
        }
    }

    @ManyToOne
    @JoinColumn(name = "order_id")
    private OrderMember order;

    @ManyToOne(optional = true)
    @JoinColumn(name = "bank_account_id")
    private BankAccount bankAccount;
}
