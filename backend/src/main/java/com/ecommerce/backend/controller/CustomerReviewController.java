package com.ecommerce.backend.controller;

import com.ecommerce.backend.entity.CustomerReview;
import com.ecommerce.backend.service.CustomerReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerReviewController {

    @Autowired
    private CustomerReviewService customerReviewService;

    @GetMapping
    public ResponseEntity<List<CustomerReview>> getAllReviews() {
        return ResponseEntity.ok(customerReviewService.getAllReviews());
    }

    @PostMapping
    public ResponseEntity<CustomerReview> createReview(@RequestBody CustomerReview review) {
        return ResponseEntity.ok(customerReviewService.createReview(review));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerReview> updateReview(@PathVariable Long id, @RequestBody CustomerReview review) {
        return ResponseEntity.ok(customerReviewService.updateReview(id, review));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        customerReviewService.deleteReview(id);
        return ResponseEntity.ok().build();
    }
}
