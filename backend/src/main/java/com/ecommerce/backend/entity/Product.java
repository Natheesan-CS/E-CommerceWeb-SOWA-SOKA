package com.ecommerce.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "products")
@Data

public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private double price;
    private int quantity;
    
    private String category;
    private String type;
    private String sizes;
    private String colors;
    
    @Column(name = "image_url")
    private String imageUrl;
}
