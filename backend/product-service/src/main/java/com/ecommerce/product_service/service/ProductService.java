package com.ecommerce.product_service.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.ecommerce.product_service.entity.Category;
import com.ecommerce.product_service.entity.Product;
import com.ecommerce.product_service.enums.ProductStatus;
import com.ecommerce.product_service.model.ProductCreationRequest;
import com.ecommerce.product_service.repository.CategoryRepository;
import com.ecommerce.product_service.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private CategoryRepository categoryRepository;


    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public String uploadImage(MultipartFile image) {
        try {
            // Upload the image to Cloudinary
            Map<?,?> uploadResult = cloudinary.uploader().upload(image.getBytes(), ObjectUtils.emptyMap());
            return (String) uploadResult.get("secure_url");
        } catch (Exception e) {
            throw new RuntimeException("Failed to upload image", e);
        }
    }
    public Product addProduct(Long userId, ProductCreationRequest productCreationRequest) {
        Category category = categoryRepository.findById(productCreationRequest.getCategory().getId())
                .orElse(
                       new Category(productCreationRequest.getCategory().getName())
                );
        categoryRepository.save(category);
        Product product = new Product();
        product.setName(productCreationRequest.getName());
        product.setDescription(productCreationRequest.getDescription());
        product.setPrice(productCreationRequest.getPrice());
        product.setCategory(category);
        product.setBrand(productCreationRequest.getBrand());
        product.setStock(productCreationRequest.getStock());
        product.setStatus(productCreationRequest.getStatus());
        product.setUserId(userId);

        product.setSoldQuantity(0L);
        productRepository.save(product);
        return product;
    }

    public String uploadProductImage(Long productId, List<MultipartFile> images) {
        List<String> imageUrls = images.stream()
                .map(this::uploadImage)
                .collect(Collectors.toList());

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setImageUrls(imageUrls);
        productRepository.save(product);
        return "Images uploaded successfully";
    }
    public Product updateProduct(Long id, ProductCreationRequest productCreationRequest) {
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        product.setName(productCreationRequest.getName());
        product.setDescription(productCreationRequest.getDescription());
        product.setPrice(productCreationRequest.getPrice());
        product.setCategory(productCreationRequest.getCategory());
        product.setBrand(productCreationRequest.getBrand());
        product.setStock(productCreationRequest.getStock());
        product.setStatus(productCreationRequest.getStatus());

        productRepository.save(product);
        return null;
    }
    public Product deleteProduct(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        product.setStatus(ProductStatus.DISCONTINUED);
        return productRepository.save(product);
    }
    public List<Product> searchProducts(String query) {
        return productRepository.findByNameContainingIgnoreCase(query);
    }
    public List<Product> getProductsByCategory(String categoryName) {
        return productRepository.findByCategoryName(categoryName);
    }
}
