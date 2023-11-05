package com.example.backend;

import com.example.backend.model.*;
import com.example.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@SpringBootApplication
@RequiredArgsConstructor
public class App implements CommandLineRunner {

    private final AccountRepository accountRepository;
    private final BranchRepository branchRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryBlogRepository categoryBlogRepository;
    private final ProductSpecificationRepository productSpecificationRepository;
    private final ProductRepository productRepository;

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


//add chi tiet của product  truocws
            ProductSpecification productSpecification = new ProductSpecification();
            productSpecification.setId(1L);
            productSpecification.setTypeCard("Integrated Graphics");
            productSpecification.setTypeCPU("Intel Core i7");
            productSpecification.setRamCapacity("16 GB");
            productSpecification.setTypeRam("DDR4");
            productSpecification.setHardDrive("512 GB SSD");
            productSpecification.setMaterial("Aluminum");
            productSpecification.setTouchScreen(true);
            productSpecification.setScreenSize("15.6 inches");
            productSpecification.setResolution("1920x1080");
            productSpecification.setWebcam("HD Webcam");
            productSpecification.setOS("Windows 10");
            productSpecification.setWf("Wi-Fi 6");
            productSpecification.setBluetooth("Bluetooth 5.0");
            productSpecification.setPowerCapacity("65 W");
            productSpecification.setPortSupport("USB-C, HDMI, etc.");

            productSpecification = productSpecificationRepository.save(productSpecification);
            if( productSpecification == null) {
                System.out.println("Error at create product specification!");
            }


//            dung for them duoc nhieu nha này tự xử lý -> có thể viết code cào dữ liệu hoặc nhập tay
//            /giờ thêm product

            List<String> listImg = new ArrayList<>();
            listImg.add("link1");
            listImg.add("link2");
//            add tiep
            ///........

            Product product = new Product();
            product.setId(1L);
            product.setLinkImages(listImg);
            product.setColor(null);
            product.setLinkVideo(null);
            product.setImageLinkThumbnail(null);
            product.setDescription("test");
            product.setShortDescription(null);
            product.setName("New Product3");
            product.setPrice(100.0);
            product.setQuantity(10);
            product.setScreenSize("5 inches");
            product.setChipSet("Example Chipset");
            product.setLaunchDate(null);
            product.setStatus(1);
            product.setIsDelete(false);

//            set product specification o tren moi upload
            product.setProductSpecification(productSpecification);

            product = productRepository.save(product);

            if( product == null) System.out.println("Upload product failed");

//            end upload product
        }




    }
}
