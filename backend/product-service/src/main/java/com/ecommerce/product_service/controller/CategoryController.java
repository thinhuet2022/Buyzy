package com.ecommerce.product_service.controller;

import com.ecommerce.product_service.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;
    @GetMapping("/all")
    public ResponseEntity<?> getAllCategories() {
        List<String> allCategories = categoryService.getAll();
        return ResponseEntity.ok(allCategories);
    }
}
