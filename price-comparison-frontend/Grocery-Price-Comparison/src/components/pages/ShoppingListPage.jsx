import { useState, useEffect, use } from "react";
import { useParams } from "react-router-dom";
import groceryItems from "../data/groceryItems.json";
import RemoveBtn from "../RemoveBtn";
import Button from "../Button";

const normalize = (text) => text.trim().toLowerCase();

const matchesMasterItem = (shoppingItemName) => {
  const normalizedShoppingItemName = normalize(shoppingItemName);

  return groceryItems.some((masterItem) => {
    const normalizedMasterItemName = normalize(masterItem.name);

    const escapedShoppingName =
      normalizedShoppingItemName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const regex = new RegExp(`\\b${escapedShoppingName}\\b`, "i");

    return regex.test(normalizedMasterItemName);
  });
};

const ShoppingListPage = () => {
  const { id } = useParams();
  const listId = Number(id);

  const [items, setItems] = useState([]);
  const [validatedItems, setValidatedItems] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Fetch items when component loads
  useEffect(() => {
    fetchItems();
  }, [listId]);

  const fetchItems = async () => {
    try {
      const response = await fetch(
        `https://price-comparison-backend.railway.internal/api/items?shoppingListId=${listId}`,
      );

      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    const validated = items.map((item) => {
      const exists = matchesMasterItem(item.name);

      return {
        ...item,
        isValid: exists,
      };
    });

    setValidatedItems(validated);
  }, [items]);

  const handleAddItem = async () => {
    if (!name.trim()) return;

    const newItem = {
      name,
      quantity,
      completed: false,
      shoppingListId: listId,
    };

    try {
      const response = await fetch("https://price-comparison-backend.railway.internal/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      const savedItem = await response.json();

      setItems([...items, savedItem]);
      setName("");
      setQuantity(1);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://price-comparison-backend.railway.internal/api/items/${id}`, {
        method: "DELETE",
      });
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const updateItem = async (item) => {
    try {
      await fetch(`https://price-comparison-backend.railway.internal/api/items/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      fetchItems();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  }

  return (
    <div>
      <h2>Shopping List #{listId}</h2>

      <div>
        <input className="item-name-input"
          type="text"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input className="item-quantity-input"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <Button
            className="add-item-btn"
            label="Add Item"
            onClick={handleAddItem}
        />
      </div>

      <ul>
        {validatedItems.map((item) => (
          <li
            key={item.id}
            className={`item-row ${item.isValid ? "valid-item" : "invalid-item"}`}
          >
            {item.name} - Qty: {item.quantity}

            {!item.isValid && (
              <span className="invalid-message">
                (Not in master list)
              </span>
            )}

            <Button
              label="+1"
              onClick={() => 
                updateItem({
                  ...item,
                  quantity: item.quantity + 1,
                })
              }
            />

            <Button
              label="-1"
              onClick={() => 
                updateItem({
                  ...item,
                  quantity: item.quantity - 1,
                })
              }
              disabled={item.quantity <= 1}
            />

            <RemoveBtn
              onClick={() => handleDelete(item.id)}
              className="remove-item-btn"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingListPage;
