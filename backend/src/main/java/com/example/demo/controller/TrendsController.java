package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Arrays;

@RestController
public class TrendsController {

    @GetMapping("/trends")
    public List<String> getTrends() {
        return Arrays.asList(
                "AI Research",
                "Blockchain Innovations",
                "Quantum Computing",
                "Climate Change Solutions",
                "Neuroscience Advances"
        );
    }
}
