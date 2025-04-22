package com.ecommerce.order_service.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "product-service")
public class ProductServiceProperties {
    // getter + setter
    private String baseUrl;


}
