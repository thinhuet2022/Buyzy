package com.ecommerce.product_service.service;

import com.ecommerce.product_service.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public List<String> getAll() {
        return categoryRepository.findAllCategoryNames();
    }
}
