package com.example.backend.dto;

import com.example.backend.model.Member;
import com.example.backend.model.Product;

import java.util.Date;

public class QuestionRequest {
    private Member member;
    private Product product;
    private String content;
    private Boolean isDeleted;
    private Boolean isReplied;
    private Date createAt;

    public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }

    public Boolean getReplied() {
        return isReplied;
    }

    public void setReplied(Boolean replied) {
        isReplied = replied;
    }

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
