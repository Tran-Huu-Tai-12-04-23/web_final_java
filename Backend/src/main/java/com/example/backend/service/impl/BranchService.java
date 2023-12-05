package com.example.backend.service.impl;

import com.example.backend.exception.NotFoundException;
import com.example.backend.model.Brand;
import com.example.backend.repository.BranchRepository;
import com.example.backend.service.IBranchService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BranchService implements IBranchService {

    private final BranchRepository branchRepository;

    @Override
    public Brand createNew(Brand br) {
        return branchRepository.save(br);
    }

    @Override
    public Brand update(Brand br, Long id) {
        return branchRepository.findById(id).map(branch-> {
            branch.setNameBrand(br.getNameBrand());
            return branchRepository.save(branch);
        }).orElseThrow(() -> new NotFoundException("Branch not found!"));
    }

    @Override
    public List<Brand> getAllBranch() {
        return branchRepository.findAll();
    }

    @Override
    public void delete(Long id) {
        branchRepository.deleteById(id);
    }
}
