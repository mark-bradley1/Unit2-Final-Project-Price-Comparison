package com.example.Price_Comparison.dto;

public class ShoppingItemDTO {

    private Long id;
    private String name;
    private int quantity;
    private boolean completed;
    private Long shoppingListId;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }

    public Long getShoppingListId() { return shoppingListId; }
    public void setShoppingListId(Long shoppingListId) { this.shoppingListId = shoppingListId; }
}