package com.ecommerce.product_service.controller;

import com.ecommerce.product_service.entity.Product;
import com.ecommerce.product_service.model.ProductCardResponse;
import com.ecommerce.product_service.model.ProductCreationRequest;
import com.ecommerce.product_service.model.ProductPageResponse;
import com.ecommerce.product_service.model.UpdateProductRequest;
import com.ecommerce.product_service.service.ProductService;
import com.ecommerce.product_service.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

    @GetMapping("/all-products")
    public ResponseEntity<?> getAllProducts(@RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "10") int size) {
        Page<ProductCardResponse> products = productService.getAllProducts(page, size);
        return ResponseEntity.ok(new ProductPageResponse<>(products));
    }

    @GetMapping("/most-popular")
    public ResponseEntity<?> getMostPopularProducts() {
        List<ProductCardResponse> products = productService.getMostPopularProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/newest-items")
    public ResponseEntity<?> getFeaturedProducts() {
        List<ProductCardResponse> products = productService.getNewestProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @PostMapping(value = "/add-product")
    public ResponseEntity<?> addProduct(@RequestHeader("Authorization") String token,
                                        @RequestBody ProductCreationRequest productCreationRequest) {

        Long sellerId = jwtUtil.extractUserId(token.substring(7));
        return ResponseEntity.ok(productService.addProduct(sellerId, productCreationRequest));
    }
    @PostMapping(value = "/upload-image/{productId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadImage(@PathVariable("productId") Long productId,
                                        @RequestParam("images") List<MultipartFile> images) {
        return ResponseEntity.ok(productService.uploadProductImage(productId ,images));
    }
    @PutMapping("/update-product/{productId}")
    public ResponseEntity<?> updateProduct(@PathVariable Long productId, @RequestBody UpdateProductRequest updateProductRequest) {
        return ResponseEntity.ok(productService.updateProduct(productId, updateProductRequest));
    }
    @DeleteMapping("/delete-product/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(productService.deleteProduct(productId));
    }
    @GetMapping("/search")
    public ResponseEntity<?> searchProducts(@RequestParam String query, @RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "10") int size) {
        Page<ProductCardResponse> products = productService.searchProducts(query, page, size);
        return ResponseEntity.ok(new ProductPageResponse<>(products));
    }
    @GetMapping("/category")
    public ResponseEntity<?> getProductsByCategory(@RequestParam String categoryName, @RequestParam(defaultValue = "0") int page,
                                                   @RequestParam(defaultValue = "10") int size) {
        Page<ProductCardResponse> products = productService.getProductsByCategory(categoryName, page, size);
        return ResponseEntity.ok(new ProductPageResponse<>(products));
    }
}
