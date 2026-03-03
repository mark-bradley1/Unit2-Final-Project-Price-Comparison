package com.example.Price_Comparison.models;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class ShoppingList {

    @ID
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "shoppingList", cascade = CascadeType.ALL)
    private List<ShoppingItem> items;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<ShoppingItem> getItems() {
        return items;
    }

    public void setItems(List<ShoppingItem> items) {
        this.items = items;
    }
}
