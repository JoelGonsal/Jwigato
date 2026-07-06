package com.fooddelivery.order_service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .cors(cors -> cors.configurationSource(request -> {

                    CorsConfiguration config = new CorsConfiguration();

                    config.setAllowedOrigins(List.of("http://localhost:8081"));

                    config.setAllowedMethods(List.of(
                            "GET",
                            "POST",
                            "PUT",
                            "DELETE",
                            "OPTIONS"
                    ));

                    config.setAllowedHeaders(List.of("*"));

                    config.setAllowCredentials(true);

                    return config;

                }))

                .authorizeHttpRequests(auth -> auth

                        .anyRequest().permitAll()

                )

                .httpBasic(Customizer.withDefaults());

        http.httpBasic(httpBasic -> httpBasic.disable());

        http.formLogin(form -> form.disable());

        return http.build();

    }

}