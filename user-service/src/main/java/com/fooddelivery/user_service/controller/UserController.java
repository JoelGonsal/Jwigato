package com.fooddelivery.user_service.controller;

import com.fooddelivery.user_service.dto.LoginRequest;
import com.fooddelivery.user_service.entity.User;
import com.fooddelivery.user_service.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:8081")
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping("/register")
    public User register(@Valid @RequestBody User user) {

        return service.register(user);

    }

    @PostMapping("/login")
    public User login(@Valid @RequestBody LoginRequest request) {

        return service.login(
                request.getEmail(),
                request.getPassword()
        );

    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {

        return service.getUserById(id);

    }

}