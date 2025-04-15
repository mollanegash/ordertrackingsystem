package com.example.ordertrackingsystem.repository;

import com.example.ordertrackingsystem.order.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {}