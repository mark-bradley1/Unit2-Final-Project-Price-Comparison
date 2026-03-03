package com.example.Price_Comparison.controllers;

import com.example.Price_Comparison.Repositories.ShoppingListRepository;
import com.example.Price_Comparison.models.ShoppingList;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lists")
public class ShoppingListController {

    private final ShoppingListRepository repository;

    public ShoppingListController(ShoppingListRepository repository) {
        this.repository = repository;
    }

    // CREATE
    @PostMapping
    public ShoppingList createList(@RequestBody ShoppingList list) {
        return repository.save(list);
    }

    // READ
    @GetMapping
    public List<ShoppingList> getAllLists() {
        return repository.findAll();
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteList(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
