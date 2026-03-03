package com.example.Price_Comparison.controllers;

import com.example.Price_Comparison.Repositories.ShoppingListRepository;
import com.example.Price_Comparison.dto.ShoppingListDTO;
import com.example.Price_Comparison.models.ShoppingList;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/lists")
public class ShoppingListController {

    private final ShoppingListRepository repository;

    // Constructor Injection
    public ShoppingListController(ShoppingListRepository repository) {
        this.repository = repository;
    }

    // CREATE
    // @RequestBody is used to bind the incoming JSON to the DTO object
    @PostMapping
    public ShoppingListDTO createList(@RequestBody ShoppingListDTO dto) {

        // Create a new ShoppingList entity and set its properties from the DTO
        ShoppingList list = new ShoppingList();
        list.setName(dto.getName());
        list.setCreatedAt(LocalDateTime.now());

        // Save the new list to the database and convert it back to a DTO for the response
        return convertToDTO(repository.save(list));
    }

    // READ
    // @GetMapping without a path means this method will handle GET requests to "/api/lists"
    @GetMapping
    public List<ShoppingListDTO> getAllLists() {
        // Fetch all lists from the database, convert each to a DTO, and return the list
        return repository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteList(@PathVariable Long id) {
        repository.deleteById(id);
    }

    // CONVERTER
    private ShoppingListDTO convertToDTO(ShoppingList list) {
        ShoppingListDTO dto = new ShoppingListDTO();
        dto.setId(list.getId());
        dto.setName(list.getName());
        dto.setCreatedAt(list.getCreatedAt());
        return dto;
    }
}