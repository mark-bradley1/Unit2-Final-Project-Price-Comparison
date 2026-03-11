import { useEffect, useState } from "react";

const RecipePage = () => {
  const [recipe, setRecipe] = useState(null);

  const fetchRecipe = async () => {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );

      const data = await response.json();
      setRecipe(data.meals[0]);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  if (!recipe) {
    return <p>Loading recipe...</p>;
  }

  return (
    <div className="recipe-page">
      <h1>Random Recipe</h1>

      <h2>{recipe.strMeal}</h2>

      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        style={{ width: "300px", borderRadius: "10px" }}
      />

      <p>
        <strong>Category:</strong> {recipe.strCategory}
      </p>

      <p>
        <strong>Cuisine:</strong> {recipe.strArea}
      </p>

      <h3>Instructions</h3>
      <p>{recipe.strInstructions}</p>

      <button onClick={fetchRecipe}>
        Get Another Recipe
      </button>
    </div>
  );
};

export default RecipePage;