package com.example.backend.service;

import com.example.backend.model.Account;
import com.example.backend.model.Branch;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface IBranchService {
    Branch createNew(Branch br);
    Branch update(Branch br, Long id);
    List<Branch> getAllBranch();
    void delete(Long id);

}
