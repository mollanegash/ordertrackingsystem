package com.example.ordertrackingsystem.repository;

import com.example.ordertrackingsystem.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
