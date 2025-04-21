package com.ecommerce.product_service.model;

import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;


@Data
public class ProductPageResponse<T> {
    private List<T> content;
    private int currentPage;
    private int totalPages;
    private long totalElements;

    public ProductPageResponse(Page<T> page) {
        this.content = page.getContent();
        this.currentPage = page.getNumber();
        this.totalPages = page.getTotalPages();
        this.totalElements = page.getTotalElements();
    }
}
