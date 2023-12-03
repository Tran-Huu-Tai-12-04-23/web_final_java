package com.example.backend.repository;

import com.example.backend.model.Account;
import com.example.backend.model.Role;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByUsername(String username);

    Account findByRole(Role role);

    Boolean existsByUsername(String username);

    List<Account> findByUsernameContaining(String key, Pageable pageable);


}
