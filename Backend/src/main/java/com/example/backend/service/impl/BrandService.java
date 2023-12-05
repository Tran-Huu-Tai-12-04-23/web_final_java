package com.example.backend.service.impl;

import com.example.backend.exception.NotFoundException;
import com.example.backend.model.Brand;
import com.example.backend.repository.BrandRepository;
import com.example.backend.service.IBranchService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BrandService implements IBranchService {

    private final BrandRepository brandRepository;

    @Override
    public Brand createNew(Brand br) {
        return brandRepository.save(br);
    }

    @Override
    public Brand update(Brand br, Long id) {
        return brandRepository.findById(id).map(branch-> {
            branch.setNameBrand(br.getNameBrand());
            return brandRepository.save(branch);
        }).orElseThrow(() -> new NotFoundException("Branch not found!"));
    }

    @Override
    public List<Brand> getAllBranch() {
        return brandRepository.findAll();
    }

    @Override
    public void delete(Long id) {
        brandRepository.deleteById(id);
    }
}
