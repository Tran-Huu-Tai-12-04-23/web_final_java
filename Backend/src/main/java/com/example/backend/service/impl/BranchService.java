package com.example.backend.service.impl;

import com.example.backend.exception.NotFoundException;
import com.example.backend.model.Branch;
import com.example.backend.model.Member;
import com.example.backend.repository.BranchRepository;
import com.example.backend.repository.MemberRepository;
import com.example.backend.service.IBranchService;
import com.example.backend.service.IMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BranchService implements IBranchService {

    private final BranchRepository branchRepository;

    @Override
    public Branch createNew(Branch br) {
        return branchRepository.save(br);
    }

    @Override
    public Branch update(Branch br, Long id) {
        return branchRepository.findById(id).map(branch-> {
            branch.setNameBranch(br.getNameBranch());
            return branchRepository.save(branch);
        }).orElseThrow(() -> new NotFoundException("Branch not found!"));
    }

    @Override
    public List<Branch> getAllBranch() {
        return branchRepository.findAll();
    }

    @Override
    public void delete(Long id) {
        branchRepository.deleteById(id);
    }
}
