package com.ecommerce.backend.service;

import com.ecommerce.backend.entity.FooterSettings;
import com.ecommerce.backend.repository.FooterSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FooterSettingsServiceImpl implements FooterSettingsService {

    @Autowired
    private FooterSettingsRepository footerSettingsRepository;

    @Override
    public FooterSettings getFooterSettings() {
        List<FooterSettings> allSettings = footerSettingsRepository.findAll();
        if (allSettings.isEmpty()) {
            FooterSettings defaultSettings = new FooterSettings(
                    "Welcome to SOKA. We provide high quality clothing and accessories.",
                    "support@sokafashion.com",
                    "+1 234 567 8900",
                    "123 Fashion Ave, NY 10001",
                    "https://facebook.com",
                    "https://instagram.com",
                    "https://twitter.com"
            );
            return footerSettingsRepository.save(defaultSettings);
        }
        return allSettings.get(0);
    }

    @Override
    public FooterSettings updateFooterSettings(FooterSettings settingsDetails) {
        FooterSettings existing = getFooterSettings();
        
        existing.setAboutText(settingsDetails.getAboutText());
        existing.setContactEmail(settingsDetails.getContactEmail());
        existing.setContactPhone(settingsDetails.getContactPhone());
        existing.setContactAddress(settingsDetails.getContactAddress());
        existing.setFacebookLink(settingsDetails.getFacebookLink());
        existing.setInstagramLink(settingsDetails.getInstagramLink());
        existing.setTwitterLink(settingsDetails.getTwitterLink());
        
        return footerSettingsRepository.save(existing);
    }
}
