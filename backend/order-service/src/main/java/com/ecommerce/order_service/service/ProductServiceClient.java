package com.ecommerce.order_service.service;

import com.ecommerce.order_service.config.ProductServiceProperties;
import com.ecommerce.order_service.model.InventoryUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class ProductServiceClient {

    private final RestTemplate restTemplate;

    private final ProductServiceProperties productServiceProperties;

    public ProductServiceClient(RestTemplate restTemplate, ProductServiceProperties productServiceProperties) {
        this.restTemplate = restTemplate;
        this.productServiceProperties = productServiceProperties;
    }

    // chỉ khi người bán xác nhận đơn hàng thì mới cập nhật lại số lượng hàng trong kho
    public String updateInventory(List<InventoryUpdateRequest> inventoryUpdateRequests, String jwtToken) {
        // Tạo HttpHeaders và thêm JWT vào header
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        System.out.println(jwtToken);
        headers.set("Authorization", "Bearer " + jwtToken); // Thêm JWT vào header
        HttpEntity<List<InventoryUpdateRequest>> request = new HttpEntity<>(inventoryUpdateRequests, headers);

        String url = productServiceProperties.getBaseUrl() + "/api/v1/products/update-inventory";
        System.out.println(url);
        return restTemplate.postForObject(url, request, String.class);
    }
}
