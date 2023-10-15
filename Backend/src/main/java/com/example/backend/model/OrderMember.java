package com.example.backend.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    @Column(columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean isCancel;

    @Column(columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean isDelete;

    @ManyToOne
    @JoinColumn(name = "order_status_id")
    private OrderStatus orderStatus;

    @OneToMany
    @JoinColumn(name = "detail_orders")
    private List<DetailOrder> detailOrders;

}
