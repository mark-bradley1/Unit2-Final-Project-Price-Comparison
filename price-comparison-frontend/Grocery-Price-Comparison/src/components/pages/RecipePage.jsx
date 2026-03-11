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

  // Extract ingredients
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <div className="recipe-page">
      <h1>Carrie's Random Recipe</h1>

      <h2>{recipe.strMeal}</h2>

      <div className="recipe-layout">
        {/* Image */}
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="recipe-image"
        />

        {/* Ingredients */}
        <div className="ingredients">
          <h3>Ingredients</h3>
          <ul>
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <p>
        <strong>Category:</strong> {recipe.strCategory}
      </p>

      <p>
        <strong>Cuisine:</strong> {recipe.strArea}
      </p>

      <h3>Instructions</h3>
      <p>{recipe.strInstructions}</p>

      <button onClick={fetchRecipe}>Get Another Recipe</button>
    </div>
  );
};

export default RecipePage;