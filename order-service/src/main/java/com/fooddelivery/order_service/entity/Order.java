package com.fooddelivery.order_service.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Table(name="orders")
@Data
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    @NotBlank(message="Restaurant is required")
    private String restaurant;

    @NotBlank(message="Food Item is required")
    private String foodItem;

    private Integer quantity;

    private Double totalPrice;

}