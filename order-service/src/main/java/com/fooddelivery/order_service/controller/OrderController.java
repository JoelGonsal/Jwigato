package com.fooddelivery.order_service.controller;

import com.fooddelivery.order_service.entity.Order;
import com.fooddelivery.order_service.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService service;

    @PostMapping
    public Order placeOrder(@Valid @RequestBody Order order) {
        return service.placeOrder(order);
    }

    @GetMapping("/user/{userId}")
    public List<Order> getOrders(@PathVariable Long userId){

        return service.getOrdersByUser(userId);

    }
}