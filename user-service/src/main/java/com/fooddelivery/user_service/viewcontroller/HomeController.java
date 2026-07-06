package com.fooddelivery.user_service.viewcontroller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/register")
    public String register() {
        return "register";
    }
    @GetMapping("/loginPage")
    public String loginPage(){

        return "login";

    }
    @GetMapping("/menu")
    public String menu(){

        return "menu";

    }
    @GetMapping("/orders")
    public String orders(){

        return "orders";

    }

}