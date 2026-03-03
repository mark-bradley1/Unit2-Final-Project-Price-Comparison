import Dropdown from "../Dropdown";
import React, { useState, useEffect } from "react";
import groceryItems from "../data/groceryItems.json";
import Button from "../Button";
import RemoveBtn from "../RemoveBtn";
import Spinner from "../Spinner";

const ComparisonPage = ({ addToCart }) => {
  const [selectedStores, setSelectedStores] = useState([]);
  const [storeNames, setStoreNames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedTerm, setSubmittedTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addedMessage, setAddedMessage] = useState("");
  const [formError, setFormError] = useState("");

  // Separating out the store names from the JSON data
  // Use of React hooks
  useEffect(() => {
    const firstItem = groceryItems[0];
    const storeKeys = Object.keys(firstItem).filter(
      (key) => !["id", "name", "category", "image"].includes(key)
    );
    setStoreNames(storeKeys);
  }, []);

  // Adding multiple stores to search from
  // Event handlers: handleAddStore, handleRemoveStore, handleSubmit
  const handleAddStore = (store) => {
    if (!selectedStores.includes(store)) {
      setSelectedStores((prev) => [...prev, store]);
    }
  };

  // Give ability to remove one store at a time
  const handleRemoveStore = (store) => {
    setSelectedStores((prev) => prev.filter((s) => s !== store));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm.trim() === "" || selectedStores.length === 0) {
      setFormError(
        "Please select at least one store and enter an item to search."
      );
      return;
    }
    
    setFilteredItems([]);
    setSubmittedTerm("");
    setIsLoading(true);
    setFormError("");

    setTimeout(() => {
      // Initial problem area
      const filtered = groceryItems.filter((item) => {
        // loop through items in groceryItems
        const itemName = item.name.toLowerCase(); // allows for case-insensitive
        const term = searchTerm.toLowerCase();

        const regex = new RegExp(`\\b${term}`, "i"); // creating a regular expression and the \\b will match only if the term is at the start of a word, "i" is for case-insensitive
        return regex.test(itemName); // checks weather the items's name matches the pattern and either keeps it or filters it out
      });
      setFilteredItems(filtered);
      setSubmittedTerm(searchTerm);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div>
      <h1 id="comp-page">Comparison Tool</h1>
      <h4>Select stores to compare: </h4>
      {/* Child component */}
      <Dropdown stores={storeNames} onSelect={handleAddStore} />{" "}
      {/*Data passed to child*/}
      {selectedStores.length > 0 && (
        <div>
          <h3>Comparing: </h3>
          {selectedStores.map((store) => (
            <span key={store} className="store-option">
              {store} {/* Child component */}
              <RemoveBtn
                id="remove-btn"
                onClick={() => handleRemoveStore(store)} // Data passed to child
                className="remove-option-btn"
              />
            </span>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit} className="search-form">
        <input
          className="search-box"
          type="text"
          placeholder="Search for an item..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {formError && <p className="error-message">{formError}</p>}
        {/* Child Component */}
        <Button type="submit" label="Search" className="search-btn" />

        {isLoading && <Spinner />}
      </form>
      {submittedTerm && filteredItems.length > 0 && (
        <div className="results-container">
          <h3>
            Showing results for "<em>{submittedTerm}</em>"
          </h3>
          {filteredItems.map(
            (
              item // Shows the result of the search with and image
            ) => (
              <div key={item.id} className="item-card">
                <div className="item-image-container">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="item-image"
                  />
                </div>
                <div className="item-info">
                  <h4 className="item-name">{item.name}</h4>
                  {selectedStores.map(
                    (
                      store // Shows the pricing data for each store
                    ) => (
                      <div key={store} className="store-row">
                        <span className="store-name">{store}:</span>
                        <span className="price">
                          {item[store] ? (
                            `$${item[store].toFixed(2)}`
                          ) : (
                            <em>N/A</em>
                          )}
                        </span>
                        {addedMessage && (
                          <div className="added">{addedMessage}</div>
                        )}
                        {/* Child component */}
                        <Button
                          label="Add to Cart"
                          className="add-to-cart-btn"
                          onClick={() => {
                            // Pop up showing that item was added to the cart
                            addToCart(item, store); // Data passed to child
                            setAddedMessage(
                              `Added ${item.name} from ${store} to cart!`
                            );

                            setTimeout(() => {
                              setAddedMessage("");
                            }, 1500);
                          }}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            )
          )}
        </div>
      )}
      {submittedTerm && filteredItems.length === 0 && (
        <p>
          No items found for "<em>{submittedTerm}</em>"
        </p>
      )}
    </div>
  );
};

export default ComparisonPage;
