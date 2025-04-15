package com.example.ordertrackingsystem.controller;

import com.example.ordertrackingsystem.order.Order;
import com.example.ordertrackingsystem.repository.OrderRepository;
import com.example.ordertrackingsystem.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order newOrder) {
        Order order = orderRepository.save(newOrder);
        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }
}
