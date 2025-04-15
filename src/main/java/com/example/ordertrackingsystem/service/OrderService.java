package com.example.ordertrackingsystem.service;

import com.example.ordertrackingsystem.order.Order;
import com.example.ordertrackingsystem.repository.CustomerRepository;
import com.example.ordertrackingsystem.repository.OrderRepository;
import com.example.ordertrackingsystem.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final CustomerRepository customerRepository;



    public OrderService(OrderRepository orderRepository, ProductRepository productRepository, CustomerRepository customerRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();

    }

    // your business methods here...
}