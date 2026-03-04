import { useState } from "react";
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

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item, store) => {
    const price = item[store] ?? null;

    const cartItem = {
      id: `${item.id}-${store}`,
      name: item.name,
      store,
      price,
    };

    setCart((prev) => [...prev, cartItem]);
  };
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
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
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
