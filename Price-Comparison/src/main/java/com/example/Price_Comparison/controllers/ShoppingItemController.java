package com.example.Price_Comparison.controllers;

import com.example.Price_Comparison.Repositories.ShoppingItemRepository;
import com.example.Price_Comparison.models.ShoppingItem;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
public class ShoppingItemController {
    private final ShoppingItemRepository repository;

    public ShoppingItemController(ShoppingItemRepository repository) {
        this.repository = repository;
    }

    // CREATE
    @PostMapping
    public ShoppingItem createItem(@RequestBody ShoppingItem item) {
        return repository.save(item);
    }

    // READ
    @GetMapping
    public List<ShoppingItem> getAllItems() {
        return repository.findAll();
    }

    // UPDATE
    @PutMapping("/{id}")
    public ShoppingItem updateItem(@PathVariable Long id, @RequestBody ShoppingItem updatedItem) {
        return repository.findById(id)
                .map(item -> {
                    item.setName(updatedItem.getName());
                    item.setQuantity(updatedItem.getQuantity());
                    item.setCompleted(updatedItem.isCompleted());
                    return repository.save(item);
                })
                .orElseThrow();
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
