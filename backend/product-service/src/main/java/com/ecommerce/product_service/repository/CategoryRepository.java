package com.ecommerce.product_service.repository;

import com.ecommerce.product_service.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    // Các phương thức truy vấn tùy chỉnh có thể được thêm vào đây
    // Ví dụ: tìm kiếm theo tên danh mục
    List<Category> findByNameContainingIgnoreCase(String name);

    @Query("SELECT c.name FROM Category c")
    List<String> findAllCategoryNames();
}
