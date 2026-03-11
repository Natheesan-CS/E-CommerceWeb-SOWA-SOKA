package com.ecommerce.backend.service;

import com.ecommerce.backend.entity.PromoBanner;
import com.ecommerce.backend.repository.PromoBannerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PromoBannerServiceImpl implements PromoBannerService {

    @Autowired
    private PromoBannerRepository promoBannerRepository;

    @Override
    public PromoBanner createPromoBanner(PromoBanner promoBanner) {
        return promoBannerRepository.save(promoBanner);
    }

    @Override
    public PromoBanner updatePromoBanner(Long id, PromoBanner promoDetails) {
        PromoBanner existing = promoBannerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("PromoBanner not found with id " + id));

        existing.setTitle(promoDetails.getTitle());
        existing.setSubtitle(promoDetails.getSubtitle());
        existing.setButtonText(promoDetails.getButtonText());
        existing.setButtonLink(promoDetails.getButtonLink());

        if (promoDetails.getImageUrl() != null && !promoDetails.getImageUrl().isEmpty()) {
            existing.setImageUrl(promoDetails.getImageUrl());
        }

        return promoBannerRepository.save(existing);
    }

    @Override
    public List<PromoBanner> getAllPromoBanners() {
        return promoBannerRepository.findAll();
    }

    @Override
    public void deletePromoBanner(Long id) {
        promoBannerRepository.deleteById(id);
    }
}
