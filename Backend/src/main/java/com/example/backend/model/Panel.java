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
public class Panel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JoinColumn( name = "account_id")
    private Account account;
    private String name;
    private String link;

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

    @Column(columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean isDelete;
}
