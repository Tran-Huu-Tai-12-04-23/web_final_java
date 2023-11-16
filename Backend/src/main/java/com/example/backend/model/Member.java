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
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

    private String email;
    private String phoneNumber;
    private Double accumulatePoints;

    @Column(columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean isDelete;

    @Column(columnDefinition = "BOOLEAN DEFAULT true")
    private Boolean status;

    @PrePersist
    public void prePersist() {
        if( isDelete == null) {
            isDelete = false;
        }
        if( status == null ) {
            status = true;
        }
    }

}
