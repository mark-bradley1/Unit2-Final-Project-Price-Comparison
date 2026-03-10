import RemoveBtn from "../RemoveBtn";
import { useEffect, useState } from "react";

const CartPage = ({ cart, removeFromCart }) => {

  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/cart")
      .then(res => res.json())
      .then(data => setCart(data));
  }, []);

  // Group items by store
  const storeGroups = cart.reduce((groups, item) => {
    if (!groups[item.store]) groups[item.store] = [];
    groups[item.store].push(item);
    return groups;
  }, {});

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cart.length === 0 && <p>Your cart is empty.</p>}

      {Object.keys(storeGroups).map((store) => {
        // Calculate total for this store
        const storeTotal = storeGroups[store].reduce(
          (sum, item) => sum + (item.price || 0),
          0
        );

        return (
          <div key={store} className="store-section">
            {/* Store header with total */}
            <h2 className="store-title">
              {store} — Total: ${storeTotal.toFixed(2)}
            </h2>

          {/* Item list for this store */}
          {storeGroups[store].map((item) => (
            <div key={item.id} className="cart-card">
              <div className="cart-info">
                {item.name}: Price:{" "}
                {item.price ? `$${item.price.toFixed(2)}` : "N/A"}
                <RemoveBtn
                  id="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  className="remove-option-btn"
                />
              </div>
            </div>
          ))}
        </div>
        );
      })}
    </div>
  );
};

export default CartPage;
