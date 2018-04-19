package com.chinwe.nifi.ui.nifiui;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home(Model model){
        model.addAttribute("name", "Chinwe Ren");
        return "index";
    }
}
