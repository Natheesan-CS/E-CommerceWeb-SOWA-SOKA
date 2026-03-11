package com.ecommerce.backend.controller;

import com.ecommerce.backend.entity.HeroSection;
import com.ecommerce.backend.service.HeroSectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/hero")
@CrossOrigin(origins = "http://localhost:3000")
public class HeroSectionController {

    @Autowired
    private HeroSectionService heroSectionService;

    @GetMapping
    public ResponseEntity<HeroSection> getHeroSection() {
        return ResponseEntity.ok(heroSectionService.getHeroSection());
    }

    @PutMapping
    public ResponseEntity<HeroSection> updateHeroSection(@RequestBody HeroSection heroSection) {
        return ResponseEntity.ok(heroSectionService.updateHeroSection(heroSection));
    }
}
