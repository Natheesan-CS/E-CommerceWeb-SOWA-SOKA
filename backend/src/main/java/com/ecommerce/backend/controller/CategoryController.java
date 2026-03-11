package com.ecommerce.backend.controller;

import com.ecommerce.backend.entity.Category;
import com.ecommerce.backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:3000") // Assuming React is on port 3000
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        return ResponseEntity.ok(categoryService.saveCategory(category));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category category) {
        return ResponseEntity.ok(categoryService.updateCategory(id, category));
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @GetMapping("/main")
    public ResponseEntity<List<Category>> getMainCategories() {
        return ResponseEntity.ok(categoryService.getMainCategories());
    }

    @GetMapping("/sub/{parentCategory}")
    public ResponseEntity<List<Category>> getSubCategories(@PathVariable String parentCategory) {
        return ResponseEntity.ok(categoryService.getSubCategories(parentCategory));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/seed")
    public ResponseEntity<String> seedCategories() {
        if (categoryService.getAllCategories().size() > 0) {
            return ResponseEntity.badRequest().body("Database is not empty");
        }

        // Seed Men
        Category men = categoryService.saveCategory(new Category("Men", "Men's fashion", "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=600", null));
        categoryService.saveCategory(new Category("T-Shirts", "", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400", "Men"));
        categoryService.saveCategory(new Category("Shirts", "", "https://images.unsplash.com/photo-1596755094514-f87e32f85e23?auto=format&fit=crop&q=80&w=400", "Men"));
        categoryService.saveCategory(new Category("Jeans", "", "https://images.unsplash.com/photo-1542272604-780c823d51c3?auto=format&fit=crop&q=80&w=400", "Men"));
        categoryService.saveCategory(new Category("Trousers", "", "https://images.unsplash.com/photo-1624378439575-d1ead6bb246d?auto=format&fit=crop&q=80&w=400", "Men"));
        categoryService.saveCategory(new Category("Jackets", "", "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=400", "Men"));
        
        // Seed Women
        Category women = categoryService.saveCategory(new Category("Women", "Women's fashion", "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600", null));
        categoryService.saveCategory(new Category("Dresses", "", "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=400", "Women"));
        categoryService.saveCategory(new Category("Tops", "", "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=400", "Women"));
        categoryService.saveCategory(new Category("Skirts", "", "https://images.unsplash.com/photo-1582142407894-ec85a1260a46?auto=format&fit=crop&q=80&w=400", "Women"));
        categoryService.saveCategory(new Category("Jeans", "", "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=400", "Women"));
        
        // Seed Kids
        Category kids = categoryService.saveCategory(new Category("Kids", "Kids' fashion", "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=600", null));
        categoryService.saveCategory(new Category("T-Shirts", "", "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?auto=format&fit=crop&q=80&w=400", "Kids"));
        categoryService.saveCategory(new Category("Shirts", "", "https://images.unsplash.com/photo-1622290319146-7b63df48a635?auto=format&fit=crop&q=80&w=400", "Kids"));
        categoryService.saveCategory(new Category("School Uniforms", "", "https://images.unsplash.com/photo-1576402325350-fc844d1d9ec3?auto=format&fit=crop&q=80&w=400", "Kids"));

        return ResponseEntity.ok("Successfully seeded categories!");
    }
}
