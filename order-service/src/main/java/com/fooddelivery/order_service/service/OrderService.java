package com.fooddelivery.order_service.service;

import com.fooddelivery.order_service.dto.UserDTO;
import com.fooddelivery.order_service.entity.Order;
import com.fooddelivery.order_service.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository repository;

    @Autowired
    private RestTemplate restTemplate;

    public Order placeOrder(Order order) {

        UserDTO user = restTemplate.getForObject(
                "http://localhost:8081/users/" + order.getUserId(),
                UserDTO.class
        );

        if (user == null) {
            throw new RuntimeException("User not found.");
        }

        if (order.getQuantity() == null || order.getQuantity() <= 0) {
            order.setQuantity(1);
        }

        return repository.save(order);
    }

    public List<Order> getOrdersByUser(Long userId) {
        return repository.findByUserId(userId);
    }

}