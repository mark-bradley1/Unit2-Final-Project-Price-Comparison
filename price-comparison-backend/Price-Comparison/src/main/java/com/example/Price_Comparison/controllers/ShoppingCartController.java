package com.example.Price_Comparison.controllers;

import com.example.Price_Comparison.Repositories.ShoppingCartRepository;
import com.example.Price_Comparison.dto.ShoppingCartDTO;
import com.example.Price_Comparison.models.ShoppingCart;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class ShoppingCartController {

    private final ShoppingCartRepository cartRepository;

    public ShoppingCartController(ShoppingCartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    // GET all cart items
    @GetMapping
    public List<ShoppingCartDTO> getCart() {
        List<ShoppingCart> items = cartRepository.findAll();
        List<ShoppingCartDTO> dtos = new ArrayList<>();

        for (ShoppingCart item : items) {
            ShoppingCartDTO dto = new ShoppingCartDTO();
            dto.id = item.getId();
            dto.name = item.getName();
            dto.store = item.getStore();
            dto.price = item.getPrice();
            dtos.add(dto);
        }

        return dtos;
    }

    // POST add item to cart
    @PostMapping
    public ShoppingCartDTO addToCart(@RequestBody ShoppingCartDTO dto) {
        ShoppingCart item = new ShoppingCart();
        item.setName(dto.name);
        item.setStore(dto.store);
        item.setPrice(dto.price);

        ShoppingCart saved = cartRepository.save(item);

        dto.id = saved.getId();
        return dto;
    }

    // DELETE remove item by id
    @DeleteMapping("/{id}")
    public void removeFromCart(@PathVariable Long id) {
        cartRepository.deleteById(id);
    }
}