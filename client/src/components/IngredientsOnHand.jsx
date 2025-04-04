import './IngredientsOnHand.css';
import { useState, useEffect } from 'react';

function IngredientsOnHand({ onClose }) {
  const [ingredients, setIngredients] = useState([]);
  const [columns, setColumns] = useState([]);
  const [newIngredientName, setNewIngredientName] = useState('');
  const [newIngredientDescription, setNewIngredientDescription] = useState('');
  const columnLimit = 20;
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(`http://localhost:8000/ingredients`);
        const data = await response.json();
        setIngredients(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchIngredients();
  }, []);

  useEffect(() => {
    if (ingredients.length > 0) {
      const newColumns = [];
      let columnIndex = 0;
      for (let i = 0; i < ingredients.length; i++) {
        if (!newColumns[columnIndex]) {
          newColumns[columnIndex] = [];
        }
        newColumns[columnIndex].push(ingredients[i]);
        if (newColumns[columnIndex].length >= columnLimit) {
          columnIndex++;
        }
      }
      setColumns(newColumns);
    }
  }, [ingredients, columnLimit]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/ingredients/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const newIngredients = ingredients.filter((ingredient) => ingredient.id !== id);
        setIngredients(newIngredients);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="ingredients-on-hand-modal">
      <div className="ingredients-on-hand-modal-content">
        <div className="ingredients-on-hand-title">
          <h2>Ingredients on Hand</h2>
        </div>
        <div style={{display: 'flex'}}>
          {columns.map((column, index) => (
            <div key={index} style={{margin: '10px'}}>
              {column.map((ingredient) => (
                <div key={ingredient.id} style={{padding: '10px', borderBottom: '1px solid #ccc'}}>
                  {ingredient.name} ({ingredient.description})
                  <button onClick={() => handleDelete(ingredient.id)} style={{float: 'right', background: 'red', color: 'white', border: 'none', padding: '5px'}}>X</button>
                </div>
              ))}
            </div>
          ))}
        </div>
        <button className="close-button" onClick={onClose}>X</button>
      </div>
    </div>
  );
}

export default IngredientsOnHand;
