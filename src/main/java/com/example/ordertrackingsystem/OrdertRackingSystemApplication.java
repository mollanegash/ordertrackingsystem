package com.example.ordertrackingsystem;

import com.example.ordertrackingsystem.order.Order;
import com.example.ordertrackingsystem.repository.OrderRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;

@SpringBootApplication
public class OrdertRackingSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrdertRackingSystemApplication.class, args);
	}

	@Bean
	CommandLineRunner run(OrderRepository orderRepository) {
		return args -> {
			Order order = new Order();
			order.setStatus("SHIPPED");
			order.setShippingDate(LocalDate.now().plusDays(2));
			orderRepository.save(order);
		};
	}



}
