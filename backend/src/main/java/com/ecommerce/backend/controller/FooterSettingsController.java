package com.ecommerce.backend.controller;

import com.ecommerce.backend.entity.FooterSettings;
import com.ecommerce.backend.service.FooterSettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/footer")
@CrossOrigin(origins = "http://localhost:3000")
public class FooterSettingsController {

    @Autowired
    private FooterSettingsService footerSettingsService;

    @GetMapping
    public ResponseEntity<FooterSettings> getFooterSettings() {
        return ResponseEntity.ok(footerSettingsService.getFooterSettings());
    }

    @PutMapping
    public ResponseEntity<FooterSettings> updateFooterSettings(@RequestBody FooterSettings settings) {
        return ResponseEntity.ok(footerSettingsService.updateFooterSettings(settings));
    }
}
