package com.ecommerce.backend.service;

import com.ecommerce.backend.entity.Product;
import java.util.List;

public interface ProductService {

    Product createProduct(Product product);

    List<Product> getAllProducts();
    
    List<Product> getNewArrivals();

    List<Product> searchProducts(String keyword);

    Product getProductById(Long id);

    Product updateProduct(Long id, Product product);

    void deleteProduct(Long id);
}
