package com.ecommerce.backend.repository;

import com.ecommerce.backend.entity.FooterSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FooterSettingsRepository extends JpaRepository<FooterSettings, Long> {
}
