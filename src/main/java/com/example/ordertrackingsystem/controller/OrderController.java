package com.example.ordertrackingsystem.controller;

import com.example.ordertrackingsystem.order.Order;
import com.example.ordertrackingsystem.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")  // Allow frontend to access the API
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;

    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @PostMapping
    public Order createOrder(@RequestBody Order newOrder) {
        System.out.println("Received newOrder from frontend: " + newOrder);
        return orderRepository.save(newOrder);
    }

    @GetMapping("/search")
    public List<Order> searchByStatus(@RequestParam String status) {
        return orderRepository.findByStatusIgnoreCase(status);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
            return ResponseEntity.noContent().build(); // 204
        } else {
            return ResponseEntity.notFound().build(); // 404
        }
    }

    @GetMapping("/sorted")
    public List<Order> getSortedOrders(@RequestParam(defaultValue = "id") String sortBy,
                                       @RequestParam(defaultValue = "asc") String direction) {
        Sort sort = direction.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        return orderRepository.findAll(sort);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order updatedOrder) {
        Optional<Order> existingOrderOpt = orderRepository.findById(id);

        if (!existingOrderOpt.isPresent()) {
            return ResponseEntity.notFound().build(); // Return 404 if order is not found
        }

        Order existingOrder = existingOrderOpt.get();
        existingOrder.setStatus(updatedOrder.getStatus());
        existingOrder.setShippingDate(updatedOrder.getShippingDate());

        // Save the updated order
        Order savedOrder = orderRepository.save(existingOrder);

        return ResponseEntity.ok(savedOrder); // Return the updated order as a response
    }
}