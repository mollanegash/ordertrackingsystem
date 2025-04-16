package com.example.ordertrackingsystem.repository;

import com.example.ordertrackingsystem.order.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByStatusIgnoreCase(String status);
}