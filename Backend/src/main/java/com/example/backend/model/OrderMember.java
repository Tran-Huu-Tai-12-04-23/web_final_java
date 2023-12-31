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

public class OrderMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    private Double total;
    private Integer amount;

    @Column(columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean isCancel;
    @Column(columnDefinition = "INT DEFAULT 0")
    private Integer stepOrder;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date orderDate;

    @Column(columnDefinition = "INT DEFAULT 0")
    private OrderStatus orderStatus;

    @Column(columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean isPayment;
    @Column(columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean isVote;

    @Column(columnDefinition = "INT DEFAULT 0")
    private MethodPayment methodPayment;

    private String phoneNumberTakeOrder;
    private String address;
    private String detailAddress;
    private String fullName;

    @OneToMany(mappedBy = "orderMember", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<OrderDetail> orderDetails;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @PrePersist
    public void prePersist() {
        if (orderStatus == null) {
            orderStatus = OrderStatus.PENDING;
        }
        if (isPayment == null) {
            isPayment = false;
        }

        if (isVote == null) {
            isVote = false;
        }
        if (orderDate == null) {
            orderDate = new Date();
        }

        if (isCancel == null) {
            isCancel = false;
        }

        if (methodPayment == null) {
            methodPayment = MethodPayment.CASH;
        }

        if (stepOrder == null) {
            stepOrder = 0;
        }
    }


}
