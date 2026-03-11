package com.ecommerce.backend.controller;

import com.ecommerce.backend.entity.PromoBanner;
import com.ecommerce.backend.service.PromoBannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/promos")
@CrossOrigin(origins = "http://localhost:3000")
public class PromoBannerController {

    @Autowired
    private PromoBannerService promoBannerService;

    @GetMapping
    public ResponseEntity<List<PromoBanner>> getAllPromoBanners() {
        return ResponseEntity.ok(promoBannerService.getAllPromoBanners());
    }

    @PostMapping
    public ResponseEntity<PromoBanner> createPromoBanner(@RequestBody PromoBanner banner) {
        return ResponseEntity.ok(promoBannerService.createPromoBanner(banner));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PromoBanner> updatePromoBanner(@PathVariable Long id, @RequestBody PromoBanner banner) {
        return ResponseEntity.ok(promoBannerService.updatePromoBanner(id, banner));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePromoBanner(@PathVariable Long id) {
        promoBannerService.deletePromoBanner(id);
        return ResponseEntity.ok().build();
    }
}
