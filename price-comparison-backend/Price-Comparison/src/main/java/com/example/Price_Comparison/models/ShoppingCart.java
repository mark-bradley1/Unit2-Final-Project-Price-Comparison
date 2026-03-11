package com.example.Price_Comparison.models;

import jakarta.persistence.*;

@Entity
@Table(name = "shopping_cart")
public class ShoppingCart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String store;

    private Double price;

    public ShoppingCart() {}

    public ShoppingCart(String name, String store, Double price) {
        this.name = name;
        this.store = store;
        this.price = price;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getStore() {
        return store;
    }

    public Double getPrice() {
        return price;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setStore(String store) {
        this.store = store;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}