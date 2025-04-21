package com.ecommerce.product_service.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.ecommerce.product_service.entity.*;
import com.ecommerce.product_service.enums.ProductStatus;
import com.ecommerce.product_service.model.*;
import com.ecommerce.product_service.repository.CategoryRepository;
import com.ecommerce.product_service.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private CategoryRepository categoryRepository;


    public Page<ProductCardResponse> getAllProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        Page<Product> products = productRepository.findAll(pageable);
        return getProductCardResponses(products);
    }

    public Page<ProductCardResponse> searchProducts(String query, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        Page<Product> products = productRepository.findByNameContainingIgnoreCase(query, pageable);

        return getProductCardResponses(products);
    }

    public Page<ProductCardResponse> getProductsByCategory(String categoryName, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());
        Page<Product> products = productRepository.findByCategoryName(categoryName, pageable);
        return getProductCardResponses(products);
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
    public ProductCreationResponse addProduct(Long sellerId, ProductCreationRequest productCreationRequest) {

        Category category = categoryRepository.findById(productCreationRequest.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Product product = new Product();
        product.setName(productCreationRequest.getName());
        product.setDescription(productCreationRequest.getDescription());
        product.setPrice(productCreationRequest.getPrice());
        product.setCategory(category);
        product.setBrand(productCreationRequest.getBrand());
        product.setStock(productCreationRequest.getStock());
        product.setStatus(productCreationRequest.getStatus());
        product.setSellerId(sellerId);
        product.setSoldQuantity(0L);

        List<VariantRequest> variantList = productCreationRequest.getVariantRequestList();
        List<Variant> variants = new ArrayList<>();
        for (VariantRequest variantRequest : variantList) {
            Variant newVariant = new Variant();
            newVariant.setProduct(product);
            newVariant.setStock(variantRequest.getStock());
            newVariant.setPrice(variantRequest.getPrice());
            List<VariantOptions> variantOptionsList = new ArrayList<>();
            for(VariantOptionRequest variantOptionRequest : variantRequest.getVariantOptions()){
                VariantOptions variantOptions = new VariantOptions();
                variantOptions.setVariant(newVariant);
                variantOptions.setOptionName(variantOptionRequest.getOptionName());
                variantOptions.setOptionValue(variantOptionRequest.getOptionValue());

               // variantOptionRepository.save(variantOptions);
                variantOptionsList.add(variantOptions);
            }
            newVariant.setVariantOptions(variantOptionsList);

            variants.add(newVariant);
//            variantRepository.save(newVariant);
        }

        product.setVariant(variants);

        productRepository.save(product);

        return new ProductCreationResponse(product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getStatus(),
                product.getStock(),
                product.getCategory().getName(),
                product.getBrand());
    }

    public String uploadProductImage(Long productId, List<MultipartFile> images) {
        List<String> imageUrls = images.stream()
                .map(this::uploadImage)
                .collect(Collectors.toList());

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.getImageUrls().clear();
        List<ProductImages> productImages = new ArrayList<>();
        for (String imageUrl : imageUrls) {
            ProductImages productImage = new ProductImages();
            productImage.setProduct(product);
            productImage.setImageUrl(imageUrl);
            productImages.add(productImage);
            product.getImageUrls().add(productImage);

        }
        productRepository.save(product);
        return "Images uploaded successfully";
    }

    public Product updateProduct(Long productId, UpdateProductRequest productCreationRequest) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
        if(productCreationRequest.getStatus() != null){
            product.setStatus(productCreationRequest.getStatus());
        }
        if(productCreationRequest.getStock() != null){
            product.setStock(productCreationRequest.getStock());
        }
        return productRepository.save(product);
    }

    public Product deleteProduct(Long productId) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
        product.setStatus(ProductStatus.DISCONTINUED);
        return productRepository.save(product);
    }

    public List<ProductCardResponse> getNewestProducts() {
        // Logic to get featured products
        List<Product> product = productRepository.findTop18ByOrderByCreatedAtDesc();
        return getProductCardResponses(product);
    }

    public List<ProductCardResponse> getMostPopularProducts() {
        List<Product> product = productRepository.findTop5ByOrderBySoldQuantityDesc();
        return getProductCardResponses(product);
    }

    private List<ProductCardResponse> getProductCardResponses(List<Product> product) {
        List<ProductCardResponse> productCardResponses = new ArrayList<>();
        for (Product p : product) {
            ProductCardResponse productCardResponse = fromProductToProductCard(p);
            productCardResponses.add(productCardResponse);
        }
        return productCardResponses;
    }
    private Page<ProductCardResponse> getProductCardResponses(Page<Product> products) {
        return products
                .map(this::fromProductToProductCard);
    }

    private ProductCardResponse fromProductToProductCard(Product product) {
        ProductCardResponse productCardResponse = new ProductCardResponse();
        productCardResponse.setProductId(product.getId());
        productCardResponse.setProductName(product.getName());
        productCardResponse.setProductPrice(product.getPrice());
        String imageUrl = null;
        for(ProductImages image : product.getImageUrls()){
            if(!Objects.equals(image.getImageUrl(), imageUrl)){
                imageUrl = image.getImageUrl();
                break;
            }
        }
        productCardResponse.setImageUrl(imageUrl);
        productCardResponse.setSoldQuantity(product.getSoldQuantity().intValue());
        if (product.getReviews() != null) {
            Double totalRating = 0d;
            for(Review review: product.getReviews()) {
                totalRating += review.getRating();
            }
            Double averageRating = totalRating / product.getReviews().size();
            productCardResponse.setRating(averageRating);
        } else {
            productCardResponse.setRating(0d);
        }
        return productCardResponse;
    }
}
