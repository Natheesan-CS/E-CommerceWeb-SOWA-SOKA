package com.ecommerce.backend.service;

import com.ecommerce.backend.entity.CustomerReview;
import java.util.List;

public interface CustomerReviewService {
    CustomerReview createReview(CustomerReview review);
    CustomerReview updateReview(Long id, CustomerReview review);
    List<CustomerReview> getAllReviews();
    void deleteReview(Long id);
}
