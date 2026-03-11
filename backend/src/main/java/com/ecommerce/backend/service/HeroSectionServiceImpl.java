package com.ecommerce.backend.service;

import com.ecommerce.backend.entity.HeroSection;
import com.ecommerce.backend.repository.HeroSectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HeroSectionServiceImpl implements HeroSectionService {

    @Autowired
    private HeroSectionRepository heroSectionRepository;

    @Override
    public HeroSection getHeroSection() {
        List<HeroSection> sections = heroSectionRepository.findAll();
        if (sections.isEmpty()) {
            // Create a default one if none exists
            HeroSection defaultHero = new HeroSection(
                    "Discover Your Style",
                    "Premium clothing collections for every occasion. Elevate your fashion today.",
                    "https://images.unsplash.com/photo-1521334884684-d80222895322",
                    "Shop Now",
                    "#categories"
            );
            return heroSectionRepository.save(defaultHero);
        }
        return sections.get(0);
    }

    @Override
    public HeroSection updateHeroSection(HeroSection updatedHero) {
        HeroSection existing = getHeroSection();
        existing.setTitle(updatedHero.getTitle());
        existing.setDescription(updatedHero.getDescription());
        
        // Only update image if a new one is provided
        if (updatedHero.getImageUrl() != null && !updatedHero.getImageUrl().isEmpty()) {
            existing.setImageUrl(updatedHero.getImageUrl());
        }
        
        existing.setButtonText(updatedHero.getButtonText());
        existing.setButtonLink(updatedHero.getButtonLink());
        return heroSectionRepository.save(existing);
    }
}
