package com.example.ordertrackingsystem.controller;

import com.example.ordertrackingsystem.order.Order;
import com.example.ordertrackingsystem.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping({"/api/orders"})
@RequiredArgsConstructor
@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;



    public OrderController(OrderService orderService) {
        // this will interfere with Spring's autowiring

        this.orderService = orderService;
    }
    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }
    @GetMapping("/api")
    public String getAllApisOrders() {
        return "this is my api";
    }
}
