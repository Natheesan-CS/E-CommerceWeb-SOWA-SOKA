package com.ecommerce.backend.service;

import com.ecommerce.backend.entity.PromoBanner;
import java.util.List;

public interface PromoBannerService {
    PromoBanner createPromoBanner(PromoBanner promoBanner);
    PromoBanner updatePromoBanner(Long id, PromoBanner promoBanner);
    List<PromoBanner> getAllPromoBanners();
    void deletePromoBanner(Long id);
}
