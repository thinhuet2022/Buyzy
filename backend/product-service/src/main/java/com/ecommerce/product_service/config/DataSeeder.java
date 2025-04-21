package com.ecommerce.product_service.config;

import com.ecommerce.product_service.entity.Category;
import com.ecommerce.product_service.repository.CategoryRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;

    @Override
    public void run(String... args) throws Exception {
        if (categoryRepository.count() == 0) {
            ObjectMapper mapper = new ObjectMapper();
            InputStream inputStream = new ClassPathResource("categories.json").getInputStream();
            List<Category> categories = mapper.readValue(inputStream, new TypeReference<>() {});
            categoryRepository.saveAll(categories);
            System.out.println("✅ Seeded categories from JSON file.");
        } else {
            System.out.println("ℹ️ Categories already exist. Skipping JSON seed.");
        }
    }
}
