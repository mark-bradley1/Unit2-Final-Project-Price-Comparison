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
            dto.setId(item.getId());
            dto.setName(item.getName());
            dto.setStore(item.getStore());
            dto.setPrice(item.getPrice());
            dtos.add(dto);
        }

        return dtos;
    }

    // POST add item to cart
    @PostMapping
    public ShoppingCartDTO addToCart(@RequestBody ShoppingCartDTO dto) {
        ShoppingCart cartItem = new ShoppingCart();
        cartItem.setName(dto.getName());
        cartItem.setStore(dto.getStore());
        cartItem.setPrice(dto.getPrice());

        ShoppingCart saved = cartRepository.save(cartItem);

        // Return a DTO with the saved ID
        ShoppingCartDTO savedDTO = new ShoppingCartDTO();
        savedDTO.setId(saved.getId());
        savedDTO.setName(saved.getName());
        savedDTO.setStore(saved.getStore());
        savedDTO.setPrice(saved.getPrice());

        return savedDTO;
    }

    // DELETE remove item by id
    @DeleteMapping("/{id}")
    public void removeFromCart(@PathVariable Long id) {
        cartRepository.deleteById(id);
    }
}