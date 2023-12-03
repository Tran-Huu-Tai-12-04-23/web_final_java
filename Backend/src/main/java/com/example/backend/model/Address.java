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
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

    private String phoneNumberTakeOrder;
    private String address;
    private String detailAddress;
    private String fullName;

    @Column(columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean isDefault;

    @PrePersist
    public void prePersist() {

        if( isDefault == null ) {
            isDefault = false;
        }

    }

}
