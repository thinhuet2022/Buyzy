package com.ecommerce.api_gateway.filter;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;

import java.util.*;
import java.util.function.Predicate;

@Component
public class RouteValidator {

    public static final List<String> openApiEndpoints = List.of(
            "/api/v1/auth/**",
            "/api/v1/users/update-address",
            "/api/v1/products/search",
            "/api/v1/products/newest-items",
            "/api/v1/products/most-popular",
            "/api/v1/products/{id}",
            "/api/v1/products/category",
            "api/v1/products/all-products"
    );

//    public Predicate<ServerHttpRequest> isSecured =
//            request -> openApiEndpoints
//                    .stream()
//                    .noneMatch(uri -> request.getURI().getPath().contains(uri));

    private static final AntPathMatcher pathMatcher = new AntPathMatcher();

    public Predicate<ServerHttpRequest> isSecured =
            request ->
            openApiEndpoints.stream()
                    .noneMatch(pattern -> pathMatcher.match(pattern, request.getURI().getPath()));

}