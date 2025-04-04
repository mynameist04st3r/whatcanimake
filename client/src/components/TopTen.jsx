import './TopTen.css'
import { useState, useEffect } from 'react';


function TopTen() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch('http://localhost:8000/recipes')
      .then((res) => res.json())
      .then((data) => {
        console.log('Recipes data:', data);
        setRecipes(data);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
        setError('Error fetching recipes');
      });
  }, []);
  if (error) {
    return <div>Error: {error}</div>
  }
  if (!recipes || !Array.isArray(recipes)) {
    return <div>No recipes found</div>;
  }
  return (
    <div>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h2>{recipe.name}</h2>
          <p>{recipe.description}</p>
          <p>{recipe.instructions}</p>
        </div>
      ))}
    </div>
  );
}
export default TopTen;