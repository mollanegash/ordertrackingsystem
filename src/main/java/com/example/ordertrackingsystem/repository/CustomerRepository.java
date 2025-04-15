package com.example.ordertrackingsystem.repository;
import com.example.ordertrackingsystem.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
