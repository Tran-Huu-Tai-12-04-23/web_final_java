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

    @Column(columnDefinition = "INT DEFAULT 0")
    private MethodPayment methodPayment;

    private String phoneNumberTakeOrder;
    private String address;
    private String detailAddress;
    private String fullName;

    @OneToMany(mappedBy = "orderMember", cascade = CascadeType.ALL, orphanRemoval = true)
<<<<<<< HEAD
=======
    @JsonManagedReference
>>>>>>> main
    private List<OrderDetail> orderDetails;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @PrePersist
    public void prePersist() {
        if (orderStatus == null) {
            orderStatus = OrderStatus.PREPARE;
        }
        if (isPayment == null) {
            isPayment = false;
        }

<<<<<<< HEAD
        if (isDelete == null) {
            isDelete = false;
=======
        if (orderDate == null) {
            orderDate = new Date();
>>>>>>> main
        }

        if (isCancel == null) {
            isCancel = false;
        }

        if (methodPayment == null) {
            methodPayment = MethodPayment.CASH;
        }
<<<<<<< HEAD
    }

    public Double calculateTotal() {
        if (orderDetails == null || orderDetails.isEmpty()) {
            return 0.0;
        }

        double total = 0.0;
        for (OrderDetail orderDetail : orderDetails) {
            total += orderDetail.getProduct().getPrice() * orderDetail.getProduct().getQuantity();
        }

        return total;
    }

    public Integer calAmount() {
        if (orderDetails == null || orderDetails.isEmpty()) {
            return 0;
        }

        Integer amount = 0;
        for (OrderDetail orderDetail : orderDetails) {
            amount += orderDetail.getProduct().getQuantity();
        }

        return amount;
    }
=======

        if (stepOrder == null) {
            stepOrder = 0;
        }
    }

>>>>>>> main

}
