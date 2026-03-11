package com.ecommerce.backend.service;

import com.ecommerce.backend.entity.CustomerReview;
import com.ecommerce.backend.repository.CustomerReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerReviewServiceImpl implements CustomerReviewService {

    @Autowired
    private CustomerReviewRepository customerReviewRepository;

    @Override
    public CustomerReview createReview(CustomerReview review) {
        return customerReviewRepository.save(review);
    }

    @Override
    public CustomerReview updateReview(Long id, CustomerReview reviewDetails) {
        CustomerReview existing = customerReviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found with id " + id));

        existing.setCustomerName(reviewDetails.getCustomerName());
        existing.setRating(reviewDetails.getRating());
        existing.setReviewText(reviewDetails.getReviewText());

        return customerReviewRepository.save(existing);
    }

    @Override
    public List<CustomerReview> getAllReviews() {
        return customerReviewRepository.findAll();
    }

    @Override
    public void deleteReview(Long id) {
        customerReviewRepository.deleteById(id);
    }
}
