package com.ecommerce.backend.repository;

import com.ecommerce.backend.entity.HeroSection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HeroSectionRepository extends JpaRepository<HeroSection, Long> {
}
