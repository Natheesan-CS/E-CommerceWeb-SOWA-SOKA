package com.ecommerce.backend.service;

import com.ecommerce.backend.entity.Category;

import java.util.List;

public interface CategoryService {
    Category saveCategory(Category category);
    Category updateCategory(Long id, Category category);
    List<Category> getAllCategories();
    List<Category> getMainCategories();
    List<Category> getSubCategories(String parentCategory);
    void deleteCategory(Long id);
}
