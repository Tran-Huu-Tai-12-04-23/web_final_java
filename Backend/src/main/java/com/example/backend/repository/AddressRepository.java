package com.example.backend.repository;

import com.example.backend.model.Account;
import com.example.backend.model.Address;
import com.example.backend.model.Member;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findAllByAccountId(Long  accountId);
    Address getAddressById(Long addressId);
    Boolean removeAddressById(Long addressId);
    Address getAddressByAccountIdAndIsDefaultTrue(Long addressId);
}
