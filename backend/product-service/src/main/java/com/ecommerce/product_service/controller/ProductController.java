package com.ecommerce.product_service.controller;

import com.ecommerce.product_service.model.ProductCreationRequest;
import com.ecommerce.product_service.service.ProductService;
import com.ecommerce.product_service.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/")
    public ResponseEntity<?> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @PostMapping(value = "/add-product")
    public ResponseEntity<?> addProduct(@RequestHeader("Authorization") String token,
                                        @RequestBody ProductCreationRequest productCreationRequest) {

        Long userId = jwtUtil.extractUserId(token.substring(7));
        return ResponseEntity.ok(productService.addProduct(userId, productCreationRequest));
    }
    @PostMapping(value = "/upload-image/{productId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadImage(@PathVariable("productId") Long productId,
                                        @RequestParam("images") List<MultipartFile> images) {
        return ResponseEntity.ok(productService.uploadProductImage(productId ,images));
    }
    @PutMapping("/update-product/{productId}")
    public ResponseEntity<?> updateProduct(@PathVariable Long productId, @RequestBody ProductCreationRequest productCreationRequest) {
        return ResponseEntity.ok(productService.updateProduct(productId, productCreationRequest));
    }
    @DeleteMapping("/delete-product/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(productService.deleteProduct(productId));
    }
    @GetMapping("/search")
    public ResponseEntity<?> searchProducts(@RequestParam String query) {
        return ResponseEntity.ok(productService.searchProducts(query));
    }
    @GetMapping("/category/{categoryName}")
    public ResponseEntity<?> getProductsByCategory(@PathVariable String categoryName) {
        return ResponseEntity.ok(productService.getProductsByCategory(categoryName));
    }
}
