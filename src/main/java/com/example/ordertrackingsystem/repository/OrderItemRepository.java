package com.example.ordertrackingsystem.repository;

import com.example.ordertrackingsystem.order.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {}
