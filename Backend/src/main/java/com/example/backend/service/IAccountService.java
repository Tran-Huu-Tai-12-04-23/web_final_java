package com.example.backend.service;

import com.example.backend.model.Account;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface IAccountService {
    Account createNew(Account ac);
    Account update(Account ac, Long id);
    List<Account> getAllAccount();
    void deleteAccount(Long id);

    UserDetailsService userDetailsService();


}
