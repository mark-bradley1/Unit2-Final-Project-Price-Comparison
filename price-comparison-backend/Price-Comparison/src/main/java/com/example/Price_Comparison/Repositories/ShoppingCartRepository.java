package com.example.Price_Comparison.Repositories;

import com.example.Price_Comparison.models.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {
}