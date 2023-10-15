package com.example.backend;

import com.example.backend.model.Account;
import com.example.backend.model.Role;
import com.example.backend.repository.AccountRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class App implements CommandLineRunner {

    private AccountRepository accountRepository;
    public App(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        Account adminAccount = accountRepository.findByRole(Role.ADMIN);

        if( null == adminAccount) {
            Account acc = new Account();
            acc.setUsername("Admin");
            acc.setPassword(new BCryptPasswordEncoder().encode("admin"));
            acc.setRole(Role.ADMIN);
            acc.setIsDelete(false);

            accountRepository.save(acc);
        }
    }
}
