package com.fooddelivery.user_service.service;

import com.fooddelivery.user_service.entity.User;
import com.fooddelivery.user_service.exception.InvalidLoginException;
import com.fooddelivery.user_service.exception.UserAlreadyExistsException;
import com.fooddelivery.user_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User register(User user) {

        if (repository.findByEmail(user.getEmail()).isPresent()) {

            throw new UserAlreadyExistsException("Email already exists");

        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return repository.save(user);

    }

    public User login(String email, String password) {

        User user = repository.findByEmail(email)
                .orElseThrow(() ->
                        new InvalidLoginException("Invalid Email"));

        if (!passwordEncoder.matches(password, user.getPassword())) {

            throw new InvalidLoginException("Invalid Password");

        }

        return user;

    }

    public User getUserById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

    }

}