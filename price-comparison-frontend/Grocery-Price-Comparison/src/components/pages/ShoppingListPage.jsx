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

    const regex = new RegExp(`\\b${normalizedMasterItemName}\\b`, "i");

    return regex.test(normalizedShoppingItemName);
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
        `http://localhost:8080/api/items?shoppingListId=${listId}`,
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
      const response = await fetch("http://localhost:8080/api/items", {
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
      await fetch(`http://localhost:8080/api/items/${id}`, {
        method: "DELETE",
      });
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div>
      <h2>Shopping List #{listId}</h2>

      <div>
        <input
          type="text"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
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
            style={{
              color: item.isValid ? "black" : "red",
              fontWeight: item.isValid ? "normal" : "bold",
              marginBottom: "8px"
            }}
          >
            {item.name} - Qty: {item.quantity}

            {!item.isValid && (
              <span style={{ marginLeft: "10px" }}>
                (Not in master list)
              </span>
            )}

            <RemoveBtn
              onClick={() => handleDelete(item.id)}
              style={{ marginLeft: "10px" }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingListPage;
