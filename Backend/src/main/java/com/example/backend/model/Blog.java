package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    private String title;
    @Column(columnDefinition = "LONGTEXT")
    private String content;
    private Boolean isDelete;
    private String thumbnails;
    private Boolean status;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date createAt;
    @PrePersist
    public void prePersist() {
        if (createAt == null) {
            createAt = new Date();
        }
        if( isDelete == null ){
            isDelete = false;
        }
        if( status == null ){
            status = false;
        }
    }

    @ManyToOne
    @JoinColumn(name = "category_blog_id")
    private CategoryBlog category;

}
