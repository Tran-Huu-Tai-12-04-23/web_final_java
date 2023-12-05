package com.example.backend.repository;

import com.example.backend.model.Category;
import com.example.backend.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByName(String name);
    Long countAllByStatus(Boolean status);

    List<Product> findByNameContaining(String key, Pageable pageable);

    List<Product> findAllByIsDeleteFalse(Pageable pageable);
    List<Product> findAllByIsDeleteFalseAndCategory(Pageable pageable, Category category);

    List<Product> findAllByStatus(Boolean status, Pageable pageable);

    @Query("SELECT p FROM Product p " +
            "JOIN p.brand b " +
            "JOIN p.category c " +
            "JOIN p.productSpecification pro " +
            "WHERE (p.name LIKE %:keyword% OR b.nameBrand LIKE %:keyword% OR c.nameCategory LIKE %:keyword% " +
            "OR p.color LIKE %:keyword% OR p.description LIKE %:keyword% OR p.shortDescription LIKE %:keyword%  " +
            "OR p.chipSet LIKE %:keyword% OR p.screenSize LIKE %:keyword% " +
            "OR pro.screenSize LIKE %:keyword% OR pro.bluetooth LIKE %:keyword% OR pro.hardDrive LIKE %:keyword% " +
            "OR pro.material LIKE %:keyword% OR pro.portSupport LIKE %:keyword% OR pro.ramCapacity LIKE %:keyword% " +
            "OR pro.typeCard LIKE %:keyword% ) " +
            "AND p.isDelete = false "
    )
    List<Product> searchProductNotDeleteByNameBrandCategoryContaining(String keyword, Pageable pageable);

    @Query("SELECT p FROM Product p " +
            "JOIN p.brand b " +
            "JOIN p.category c " +
            "JOIN p.productSpecification pro " +
            "WHERE (p.name LIKE %:keyword% OR b.nameBrand LIKE %:keyword% OR c.nameCategory LIKE %:keyword% " +
            "OR p.color LIKE %:keyword% OR p.description LIKE %:keyword% OR p.shortDescription LIKE %:keyword%  " +
            "OR p.chipSet LIKE %:keyword% OR p.screenSize LIKE %:keyword% " +
            "OR pro.screenSize LIKE %:keyword% OR pro.bluetooth LIKE %:keyword% OR pro.hardDrive LIKE %:keyword% " +
            "OR pro.material LIKE %:keyword% OR pro.portSupport LIKE %:keyword% OR pro.ramCapacity LIKE %:keyword%) " +
            "AND c.id = :categoryId " +
            "AND p.isDelete = false"
    )

    List<Product> searchProductNotDeleteByNameBrandCategoryContainingAndCategory(String keyword, @Param("categoryId") Long categoryId, Pageable pageable);



    @Query("SELECT p FROM Product p " +
            "JOIN p.brand b " +
            "JOIN p.category c " +
            "JOIN p.productSpecification pro " +
            "WHERE (p.name LIKE %:keyword% OR b.nameBrand LIKE %:keyword% OR c.nameCategory LIKE %:keyword% " +
            "OR p.color LIKE %:keyword% OR p.description LIKE %:keyword% OR p.shortDescription LIKE %:keyword%  " +
            "OR p.chipSet LIKE %:keyword% OR p.screenSize LIKE %:keyword% " +
            "OR pro.screenSize LIKE %:keyword% OR pro.bluetooth LIKE %:keyword% OR pro.hardDrive LIKE %:keyword% " +
            "OR pro.material LIKE %:keyword% OR pro.portSupport LIKE %:keyword% OR pro.ramCapacity LIKE %:keyword%) " +
            "AND (:categoryId IS NULL OR c.id = :categoryId) " +
            "AND (:minPrice IS NULL OR p.price >= :minPrice) " +
            "AND (:maxPrice IS NULL OR p.price <= :maxPrice) " +
            "AND p.isDelete = false")
    List<Product> searchProductNotDeleteByNameBrandCategoryContainingAndCategoryAndBetweenPrice(
            @Param("keyword") String keyword,
            @Param("categoryId") Long categoryId,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            Pageable pageable);

    @Query("SELECT p FROM Product p " +
            "JOIN p.brand b " +
            "JOIN p.category c " +
            "JOIN p.productSpecification pro " +
            "WHERE (p.name LIKE %:keyword% OR b.nameBrand LIKE %:keyword% OR c.nameCategory LIKE %:keyword% " +
            "OR p.color LIKE %:keyword% OR p.description LIKE %:keyword% OR p.shortDescription LIKE %:keyword%  " +
            "OR p.chipSet LIKE %:keyword% OR p.screenSize LIKE %:keyword% " +
            "OR pro.screenSize LIKE %:keyword% OR pro.bluetooth LIKE %:keyword% OR pro.hardDrive LIKE %:keyword% " +
            "OR pro.material LIKE %:keyword% OR pro.portSupport LIKE %:keyword% OR pro.ramCapacity LIKE %:keyword%) " +
            "AND (:categoryId IS NULL OR c.id = :categoryId) AND (:brandId IS NULL OR b.id = :brandId) " +
            "AND (:minPrice IS NULL OR p.price >= :minPrice) " +
            "AND (:maxPrice IS NULL OR p.price <= :maxPrice) " +
            "AND p.isDelete = false " +
            "AND p.status = :status "
    )
    List<Product> searchProductNotDeleteByNameBrandCategoryContainingAndCategoryAndBetweenPriceAndStatus(
            @Param("keyword") String keyword,
            @Param("categoryId") Long categoryId,
            @Param("brandId") Long brandId,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            @Param("status") Boolean status,
            Pageable pageable);


    @Query("SELECT p FROM Product p " +
            "JOIN p.brand b " +
            "JOIN p.category c " +
            "JOIN p.productSpecification pro " +
            "WHERE (:categoryId IS NULL OR c.id = :categoryId) " +
            "AND (:minPrice IS NULL OR p.price >= :minPrice) " +
            "AND (:maxPrice IS NULL OR p.price <= :maxPrice) " +
            "AND p.isDelete = false")
    List<Product> getAllProductNotDeleteByNameBrandCategoryContainingAndCategoryAndBetweenPrice(
            @Param("categoryId") Long categoryId,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            Pageable pageable);



    @Query("SELECT COUNT(p) FROM Product p " +
            "JOIN p.brand b " +
            "JOIN p.category c " +
            "JOIN p.productSpecification pro " +
            "WHERE (p.name LIKE %:keyword% OR b.nameBrand LIKE :keyword OR c.nameCategory LIKE :keyword " +
            "OR p.color LIKE :keyword OR p.description LIKE :keyword OR p.shortDescription LIKE :keyword  " +
            "OR p.chipSet LIKE :keyword OR p.screenSize LIKE :keyword " +
            "OR pro.screenSize LIKE :keyword OR pro.bluetooth LIKE :keyword OR pro.hardDrive LIKE :keyword " +
            "OR pro.material LIKE :keyword OR pro.portSupport LIKE :keyword OR pro.ramCapacity LIKE :keyword) " +
            "AND (:categoryId IS NULL OR c.id = :categoryId) " +
            "AND (:brandId IS NULL OR c.id = :brandId) " +
            "AND (:minPrice IS NULL OR p.price >= :minPrice) " +
            "AND (:maxPrice IS NULL OR p.price <= :maxPrice) " +
            "AND p.isDelete = false " +
            "AND p.status = :status"
    )
    Long countProductNotDelete(
            @Param("keyword") String keyword,
            @Param("categoryId") Long categoryId,
            @Param("brandId") Long brandId,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            @Param("status") Boolean status);



}
