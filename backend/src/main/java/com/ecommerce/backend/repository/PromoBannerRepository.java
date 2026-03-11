package com.ecommerce.backend.repository;

import com.ecommerce.backend.entity.PromoBanner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromoBannerRepository extends JpaRepository<PromoBanner, Long> {
}
