package com.example.backend;

import com.example.backend.model.*;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.BranchRepository;
import com.example.backend.repository.CategoryBlogRepository;
import com.example.backend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
@RequiredArgsConstructor
public class App implements CommandLineRunner {

    private final AccountRepository accountRepository;
    private final BranchRepository branchRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryBlogRepository categoryBlogRepository;

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

            String[] listBranch = {"Apple", "Samsung", "Oppo", "Sony", "Xiaomi"};


            for( String branch : listBranch) {
                Branch newBranch = new Branch();
                newBranch.setNameBranch(branch);
                branchRepository.save(newBranch);
            }

            String[] listCategory = {"Tablet", "Mobile Phone", "Camera", "Ipad", "Laptop", "PC"};
            for( String category : listCategory) {
                Category newCategory = new Category();
                newCategory.setNameCategory(category);
                categoryRepository.save(newCategory);
            }

            String[] listCategoryBlog = {"Tech information", "Discovery", "S-Game", "Rate Tech", "Review", "Feature product"};
            for( String categoryBl : listCategoryBlog) {
                CategoryBlog newCategoryBlog = new CategoryBlog();
                newCategoryBlog.setNameCategory(categoryBl);
                categoryBlogRepository.save(newCategoryBlog);
            }
        }




    }
}
