import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AboutPage from "./components/pages/AboutPage";
import ContactPage from "./components/pages/ContactPage";
import ComparisonPage from "./components/pages/ComparisonPage";
import CartPage from "./components/pages/CartPage";
import HomePage from "./components/pages/HomePage";
import ShoppingListPage from "./components/pages/ShoppingListPage";
import RecipePage from "./components/pages/RecipePage";

function App() {
  const [cart, setCart] = useState([]);

  // Fetch cart from backend on page load
  const fetchCart = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/cart");
      if (!response.ok) throw new Error("Failed to fetch cart");

      const data = await response.json();
      setCart(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (item, store) => {
    const price = item[store] ?? null;

    const cartItem = {
      name: item.name,
      store,
      price,
    };

    try {
      const response = await fetch("http://localhost:8080/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItem),
      });

      if (!response.ok) throw new Error("Failed to add item");

      await fetchCart(); // refresh cart from database
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromCart = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/cart/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to remove item");

      await fetchCart(); // refresh cart
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="body-container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/cart"
            element={<CartPage cart={cart} removeFromCart={removeFromCart} />}
          />
          <Route
            path="/comparison"
            element={<ComparisonPage addToCart={addToCart} />}
          />
          <Route path="/shopping-list/:id" element={<ShoppingListPage />} />
          <Route path="/recipes" element={<RecipePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
