package com.example.backend.service;

import com.example.backend.model.Brand;

import java.util.List;

public interface IBranchService {
    Brand createNew(Brand br);
    Brand update(Brand br, Long id);
    List<Brand> getAllBranch();
    void delete(Long id);

}
