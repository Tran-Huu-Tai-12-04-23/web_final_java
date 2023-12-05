package com.example.backend;

import com.example.backend.model.*;
import com.example.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.io.IOException;
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
        SpringApplication.run(com.example.backend.App.class, args);
        //getAllProductDetail();
    }

    @Override
    public void run(String... args) throws Exception {
        Account adminAccount = accountRepository.findByRole(Role.ADMIN);

        if( null == adminAccount) {
            Account acc = new Account();
            acc.setUsername("Admin");
            acc.setPassword(new BCryptPasswordEncoder().encode("admin"));
            acc.setRole(Role.ADMIN);
            accountRepository.save(acc);

            String[] listBranch = {"Apple", "Samsung", "Oppo", "Sony", "Xiaomi","Asus","Acer","Dell","MSI","Lenovo","LG"};

            for( String branch : listBranch) {
                Brand newBranch = new Brand();
                newBranch.setNameBrand(branch);
                branchRepository.save(newBranch);
            }

            String[] listCategory = {"Tablet", "Mobile Phone", "Camera", "Laptop", "PC"};
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
            productSpecification.setTouchScreen("Yes");
            productSpecification.setScreenSize("15.6 inches");
            productSpecification.setResolution("1920x1080");
            productSpecification.setWebcam("HD Webcam");
            productSpecification.setOS("Windows 10");
            productSpecification.setWifi("Wi-Fi 6");
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

//            end upload product


            //add laptop
            String laptopBrandURL[] = {"https://gearvn.com/collections/laptop-asus-hoc-tap-va-lam-viec","https://gearvn.com/collections/laptop-acer-hoc-tap-va-lam-viec"
                    ,"https://gearvn.com/collections/laptop-dell-hoc-tap-va-lam-viec","https://gearvn.com/collections/laptop-msi-hoc-tap-va-lam-viec",
                    "https://gearvn.com/collections/laptop-lenovo-hoc-tap-va-lam-viec","https://gearvn.com/collections/laptop-lg-gram"};
//            addByBrandLaptop(laptopBrandURL[0],6L,listImg);
//            addByBrandLaptop(laptopBrandURL[1],7L,listImg);
//            addByBrandLaptop(laptopBrandURL[2],8L,listImg);
//            addByBrandLaptop(laptopBrandURL[3],9L,listImg);
//            addByBrandLaptop(laptopBrandURL[4],10L,listImg);
//            addByBrandLaptop(laptopBrandURL[5],11L,listImg);
            //add tablet
            String tabletBrandUrl [] ={"https://hoanghamobile.com/tablet/ipad","https://hoanghamobile.com/tablet/samsung","https://hoanghamobile.com/tablet/oppo","https://hoanghamobile.com/tablet/xiaomi"};
//            addByBrandTablet(tabletBrandUrl[0],1L,listImg);
//            addByBrandTablet(tabletBrandUrl[1],2L,listImg);
//            addByBrandTablet(tabletBrandUrl[2],3L,listImg);
//            addByBrandTablet(tabletBrandUrl[3],5L,listImg);
//            add phone ( use the same method as tablet)
            String phoneBrandUrl[] ={"https://hoanghamobile.com/dien-thoai-di-dong/iphone","https://hoanghamobile.com/dien-thoai-di-dong/samsung","https://hoanghamobile.com/dien-thoai-di-dong/xiaomi","https://hoanghamobile.com/dien-thoai-di-dong/oppo"};
//            addByBrandPhone(phoneBrandUrl[0],1L,listImg);
//            addByBrandPhone(phoneBrandUrl[1],2L,listImg);
//            addByBrandPhone(phoneBrandUrl[2],5L,listImg);
//            addByBrandPhone(phoneBrandUrl[3],3L,listImg);
        }
    }
    public void addByBrandPhone(String brandUrl,Long brandId,List<String> listImg){
        for (String productUrl: getTabletURLs(brandUrl)){
            addPhoneProduct(getTabletDescription(productUrl),brandId,productUrl);
        }
    }
    public void addByBrandLaptop(String brandUrl,Long brandId,List<String> listImg){
        for (String productUrl : getProductUrls(brandUrl)){
            addLaptopProduct(getLaptopDescription(productUrl),brandId,productUrl);
        }
    }
    public void addByBrandTablet(String brandURL,Long brandId,List<String> listImg){
        for (String productUrl: getTabletURLs(brandURL)){
            addTableProduct(getTabletDescription(productUrl),brandId,productUrl);
        }
    }
    public ProductSpecification addPhoneSpecification(List<String> productInfo){
        ProductSpecification productSpecification = new ProductSpecification();
        productSpecification.setTypeCPU(getFeature(productInfo,"Vi xử lý"));
        productSpecification.setRamCapacity(getFeature(productInfo,"RAM: "));
        productSpecification.setHardDrive(getFeature(productInfo,"Bộ nhớ trong"));
        productSpecification.setScreenSize(getFeature(productInfo,"Kích thước màn hình"));
        productSpecification.setMaterial("Aluminum");
        productSpecification.setTouchScreen("Yes");
        productSpecification.setResolution(getFeature(productInfo,"Độ phân giải"));
        productSpecification.setOS(getFeature(productInfo,"Hệ điều hành"));
        productSpecification.setWifi(getFeature(productInfo,"WiFi"));
        productSpecification.setBluetooth(getFeature(productInfo,"Bluetooth"));
        productSpecification.setPowerCapacity(getFeature(productInfo,"Pin"));
        productSpecification.setPortSupport(getFeature(productInfo,"Cổng kết nối: "));
        productSpecification = productSpecificationRepository.save(productSpecification);
        if( productSpecification == null) {
            System.out.println("Error at create product specification!");
        }
        System.out.println("Add product successfully");
        return productSpecification;
    }
    public void addPhoneProduct(List<String> productInfo,Long brandId,String productUrl){
        Product product = new Product();
        product.setCategory(categoryRepository.findById(2L).get());
        product.setBranch(branchRepository.findById(brandId).get());
        product.setBrand(branchRepository.findById(brandId).get());
        product.setLinkImages(getImageListPhone_Tablet(productUrl));
        product.setColor("Black");
        product.setLinkVideo(null);
        product.setThumbnails(getFeature(productInfo,"ImageSrc"));
        product.setDescription("test");
        product.setShortDescription(null);
        product.setName(getFeature(productInfo,"Name"));
        product.setPrice(priceFormat(getFeature(productInfo,"Price")));
        product.setQuantity(10);
        product.setScreenSize("14 inch");
        product.setScreenSize(getFeature(productInfo,"Công nghệ màn hình"));
        product.setChipSet(getFeature(productInfo,"Vi xử lý"));
        product.setLaunchDate(new Date());
        product.setStatus(true);
        product.setIsDelete(false);

//            set product specification o tren moi upload
        product.setProductSpecification(addPhoneSpecification(productInfo));
        product = productRepository.save(product);

        if( product == null) System.out.println("Upload product failed");
    }
    public ProductSpecification addTableSpecification(List<String> productInfo){
        ProductSpecification productSpecification = new ProductSpecification();
        productSpecification.setTypeCPU(getFeature(productInfo,"Chip xử lý (CPU)"));
        productSpecification.setRamCapacity(getFeature(productInfo,"RAM: "));
        productSpecification.setHardDrive(getFeature(productInfo,"Bộ nhớ trong"));
        productSpecification.setMaterial("Aluminum");
        productSpecification.setTouchScreen("Yes");
        productSpecification.setScreenSize("15.6 inches");
        productSpecification.setResolution(getFeature(productInfo,"Công nghệ màn hình"));
        productSpecification.setOS(getFeature(productInfo,"Hệ điều hành"));
        productSpecification.setWifi(getFeature(productInfo,"WiFi"));
        productSpecification.setBluetooth(getFeature(productInfo,"Bluetooth"));
        productSpecification.setPowerCapacity(getFeature(productInfo,"Pin"));
        productSpecification.setPortSupport(getFeature(productInfo,"Cổng kết nối: "));

        productSpecification = productSpecificationRepository.save(productSpecification);
        if( productSpecification == null) {
            System.out.println("Error at create product specification!");
        }
        System.out.println("Add product successfully");
        return productSpecification;
    }
    public void addTableProduct(List<String> productInfo, Long brandID,String productURL){
        Product product = new Product();
//        product.setId(id);
        product.setCategory(categoryRepository.findById(1L).get());
        product.setBranch(branchRepository.findById(brandID).get());
        product.setBrand(branchRepository.findById(brandID).get());
        product.setLinkImages(getImageListPhone_Tablet(productURL));
        product.setColor("Black");
        product.setLinkVideo(null);
        product.setThumbnails(getFeature(productInfo,"ImageSrc"));
        product.setDescription("test");
        product.setName(getFeature(productInfo,"Name"));
        product.setPrice(priceFormat(getFeature(productInfo,"Price")));
        product.setQuantity(10);
        product.setScreenSize(getFeature(productInfo,"Công nghệ màn hình"));
        product.setChipSet(getFeature(productInfo,"Chip xử lý (CPU)"));
        product.setLaunchDate(new Date());
        product.setStatus(true);
        product.setIsDelete(false);

//            set product specification o tren moi upload
        product.setProductSpecification(addTableSpecification(productInfo));
        product = productRepository.save(product);

        if( product == null) System.out.println("Upload product failed");
    }
    public static List<String> getTabletDescription(String url){
        List<String> tabletDescription = new ArrayList<>();
        try{
            Document document = Jsoup.connect(url).get();
            String tabletName = document.selectFirst("div.top-product h1").text();
            String tabletPrice = document.selectFirst("p.price.current-product-price strong").text();
            tabletDescription.add("Name: "+tabletName);
            tabletDescription.add("Price: "+tabletPrice);
            String imgSource = document.select("div.product-spect-img img").first().attr("src");
            tabletDescription.add("ImageSrc: "+imgSource);
            Elements tableSpecs = document.select("div.specs-special ol");
            for (Element spec : tableSpecs){
                tabletDescription.add(spec.text().replace("::",":"));
            }
        }catch (IOException e){
            e.printStackTrace();
        }
        return tabletDescription;
    }
    public static List<String> getTabletURLs(String url){
        List<String> tabletURLList = new ArrayList<>();
        try{
            Document document = Jsoup.connect(url).get();
            Elements tabletItemsList = document.select("div.item div.info a.title");
            for (Element tabletItem : tabletItemsList){
                String extractUrl = tabletItem.attr("href");
                String tabletUrl = "https://hoanghamobile.com/" + extractUrl;
                tabletURLList.add(tabletUrl);
            }
        }catch (IOException e){
            e.printStackTrace();
        }
        return tabletURLList;
    }
    public ProductSpecification addLaptopProductSpecification(List<String> productInfo){
        ProductSpecification productSpecification = new ProductSpecification();
        if (getFeature(productInfo,"Card đồ họa: ") != null){
            productSpecification.setTypeCard(getFeature(productInfo,"Card đồ họa: "));
        }else {
            productSpecification.setTypeCard(getFeature(productInfo,"VGA: "));
        }
        productSpecification.setTypeCPU(getFeature(productInfo,"CPU: "));
        productSpecification.setRamCapacity(getFeature(productInfo,"RAM"));
        productSpecification.setTypeRam("DDR4");
        productSpecification.setHardDrive(getFeature(productInfo,"Ổ cứng"));
        productSpecification.setMaterial("Aluminum");
        productSpecification.setTouchScreen("Yes");
        //productSpecification.setScreenSize(getFeature(productInfo,"Màn hình"));
        productSpecification.setScreenSize("14 inch");
        productSpecification.setResolution("1920x1080");
        productSpecification.setWebcam(getFeature(productInfo,"Webcam"));
        productSpecification.setOS(getFeature(productInfo,"Hệ điều hành"));
        if (getFeature(productInfo,"Chuẩn WIFI") != null){
            productSpecification.setWifi(getFeature(productInfo,"Chuẩn WIFI"));
        }else {
            productSpecification.setWifi("Wifi : Wi-Fi 6E(802.11ax) (Dual band) 2*2");
        }
        if (getFeature(productInfo,"Bluetooth") != null){
            productSpecification.setBluetooth(getFeature(productInfo,"Bluetooth"));
        }else {
            productSpecification.setBluetooth("Bluetooth: Bluetooth 5.2");
        }
        productSpecification.setPowerCapacity(getFeature(productInfo,"Pin"));
        productSpecification.setPortSupport(getFeature(productInfo,"Cổng kết nối: "));

        productSpecification = productSpecificationRepository.save(productSpecification);
        if( productSpecification == null) {
            System.out.println("Error at create product specification!");
        }
        System.out.println("Add product successfully");
        return productSpecification;
    }
    public void addLaptopProduct(List<String> productInfo,Long brandID,String productUrl){
        Product product = new Product();
        product.setCategory(categoryRepository.findById(4L).get());
<<<<<<< HEAD
        product.setBranch(branchRepository.findById(brandID).get());
=======
        product.setBrand(branchRepository.findById(brandID).get());
>>>>>>> main
        product.setLinkImages(getImageLaptop(productUrl));
        product.setColor(getFeature(productInfo,"Màu sắc"));
        product.setLinkVideo(null);
        product.setThumbnails(getFeature(productInfo,"Product imgSrc"));
        product.setDescription("test");
        product.setShortDescription(null);
        product.setName(getFeature(productInfo,"Product name"));
        product.setPrice(priceFormat(getFeature(productInfo,"Product price")));
        product.setQuantity(10);
        product.setScreenSize("14 inch");
        product.setScreenSize(getFeature(productInfo,"Màn hình: "));
        product.setChipSet(getFeature(productInfo,"CPU"));
        product.setLaunchDate(new Date());
        product.setStatus(true);
        product.setIsDelete(false);

//            set product specification o tren moi upload
        product.setProductSpecification(addLaptopProductSpecification(productInfo));
        product = productRepository.save(product);

        if( product == null) System.out.println("Upload product failed");
    }
    public static String[] getProductUrls(String url) {
        List<String> productUrlList = new ArrayList<>();

        try {
            Document document = Jsoup.connect(url).get();
            Elements productItemList = document.select(".proloop");

            for (Element productItem : productItemList) {
                String extractUrl = productItem.select("h3.proloop-name a").attr("href");
                String productURL = "https://gearvn.com" + extractUrl;
                if (productURL.contains("laptop")){
                    productUrlList.add(productURL);
                }
            }
        } catch (IOException exception) {
            exception.printStackTrace();
        }
        return productUrlList.toArray(new String[0]);
    }
    public static List<String> getLaptopDescription(String url) {
        List<String> productInfoList = new ArrayList<>();

        try {
            Document document = Jsoup.connect(url).get();
            String productName = document.selectFirst(".product-name").text();
            String productPrice = document.selectFirst(".pro-price").text();
            String productImageLink ="https:"+ document.selectFirst("div.boxlazy-img--insert img").attr("src");

            productInfoList.add("Product name: "+productName);
            productInfoList.add("Product price: "+productPrice);
            productInfoList.add("Product imgSrc: "+productImageLink);
            Elements tables = document.select("table");
            if (!tables.isEmpty()) {
                Element infoTable = tables.get(0);
                Elements rows = infoTable.select("tr");
                for (Element row : rows) {
                    Elements cells = row.select("td");
                    if (cells.size() >= 2) {
                        String cell1Text = cells.get(0).text();
                        String cell2Text = cells.get(1).text();
                        productInfoList.add(cell1Text + ": " + cell2Text);
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return productInfoList;
    }
    public static List<String> getImageLaptop(String url){
        List<String> imageSrcList = new ArrayList<>();
        try{
            Document document = Jsoup.connect(url).get();
            Elements imageElements = document.select("div.swiper-wrapper img.product-thumb--photo");
            for (Element imgSrc : imageElements){
                imageSrcList.add("https:"+imgSrc.attr("src"));
            }
        }catch (IOException exception){
            exception.printStackTrace();
        }
        return imageSrcList;
    }
    public static List<String> getImageListPhone_Tablet(String url){
        List<String> imgSrcList = new ArrayList<>();
        try{
            Document document = Jsoup.connect(url).get();
            Elements imgSrcListEl = document.select("div[data-u='slides'] img");
            for (Element imgSrc: imgSrcListEl){
                imgSrcList.add(imgSrc.attr("src"));
            }
        }catch (IOException e){
            e.printStackTrace();
        }
        return imgSrcList;
    }

    public static String getFeature(List<String> technicalInfoList, String filteredFeature){
        for (String feature : technicalInfoList){
            if (feature.contains(filteredFeature)){
                return feature.split(": ")[1];
            }
        }
        return null;
    }
    public static Double priceFormat(String input){
        String cleanedString = input.replaceAll("[₫.,]", "");

        // Parse the cleaned string to a double
        try {
            double amountInDollars = Double.parseDouble(cleanedString) / 23000.0; // Assuming 1₫ = 23,000 dollars
            System.out.println("Amount in dollars: $" + amountInDollars);
            return  amountInDollars;
        } catch (NumberFormatException e) {
            System.err.println("Failed to parse the string as a double.");
        }
        return 0.0;
    }

}
