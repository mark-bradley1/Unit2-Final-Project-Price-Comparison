package com.example.Price_Comparison.controllers;

import com.example.Price_Comparison.Repositories.ShoppingItemRepository;
import com.example.Price_Comparison.Repositories.ShoppingListRepository;
import com.example.Price_Comparison.dto.ShoppingItemDTO;
import com.example.Price_Comparison.models.ShoppingItem;
import com.example.Price_Comparison.models.ShoppingList;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
public class ShoppingItemController {

    private final ShoppingItemRepository itemRepository;
    private final ShoppingListRepository listRepository;

    // Constructor Injection
    public ShoppingItemController(ShoppingItemRepository itemRepository,
                                  ShoppingListRepository listRepository) {
        this.itemRepository = itemRepository;
        this.listRepository = listRepository;
    }

    // CREATE
    // @RequestBody is used to bind the incoming JSON to the DTO object
    @PostMapping
    public ShoppingItemDTO createItem(@RequestBody ShoppingItemDTO dto) {

        // Fetch the associated shopping list using the ID from the DTO
        ShoppingList list = listRepository
                .findById(dto.getShoppingListId())
                .orElseThrow();

        // Create a new ShoppingItem entity and set its properties from the DTO
        ShoppingItem item = new ShoppingItem();
        item.setName(dto.getName());
        item.setQuantity(dto.getQuantity());
        item.setCompleted(dto.isCompleted());
        item.setShoppingList(list);

        // Save the new item to the database and convert it back to a DTO for the response
        return convertToDTO(itemRepository.save(item));
    }

    // READ
    // @GetMapping without a path means this method will handle GET requests to "/api/items"
    @GetMapping(params = "shoppingListId")
    public List<ShoppingItemDTO> getItemsByList(@RequestParam Long shoppingListId) {
        // Fetch all items from the database, convert each to a DTO, and return the list
        return itemRepository.findByShoppingListId(shoppingListId)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    // UPDATE
    // @PutMapping("/{id}") means this method will handle PUT requests to "/api/items/{id}"
    @PutMapping("/{id}")
    // @PathVariable is used to extract the {id} from the URL and bind it to the method parameter
    // @RequestBody is used to bind the incoming JSON to the DTO object
    public ShoppingItemDTO updateItem(@PathVariable Long id,
                                      @RequestBody ShoppingItemDTO dto) {

        // Fetch the existing item from the database using the ID from the URL
        return itemRepository.findById(id)
                .map(item -> {
                    item.setName(dto.getName());
                    item.setQuantity(dto.getQuantity());
                    item.setCompleted(dto.isCompleted());
                    return convertToDTO(itemRepository.save(item));
                })
                .orElseThrow(); // If the item is not found, throw an exception (you might want to handle this more gracefully in a real application)
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        itemRepository.deleteById(id);
    }

    // CONVERTER
    private ShoppingItemDTO convertToDTO(ShoppingItem item) {
        ShoppingItemDTO dto = new ShoppingItemDTO();
        dto.setId(item.getId());
        dto.setName(item.getName());
        dto.setQuantity(item.getQuantity());
        dto.setCompleted(item.isCompleted());
        dto.setShoppingListId(item.getShoppingList().getId());
        return dto;
    }
}