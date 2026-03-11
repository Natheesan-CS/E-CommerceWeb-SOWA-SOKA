package com.ecommerce.backend.service;

import com.ecommerce.backend.entity.FooterSettings;

public interface FooterSettingsService {
    FooterSettings getFooterSettings();
    FooterSettings updateFooterSettings(FooterSettings settings);
}
