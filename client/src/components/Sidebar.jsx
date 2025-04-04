import './Sidebar.css';
import { useState } from 'react';
import IngredientsOnHand from './IngredientsOnHand';

function Sidebar() {
  const [showIngredients, setShowIngredients] = useState(false);
  const handleIngredientsClick = () => {
    setShowIngredients(true);
  };
  const handleClose = () => {
    setShowIngredients(false);
  }

  return (
    <div>
      <div className="sidebar-component-container">
        <input className="sidebar-component-search-bar" type="text" placeholder="Search" />
        <button className="diet-restrictions-button">Diet Restrictions</button>
        <button className="ingredients-button" onClick={handleIngredientsClick}>Ingredients on Hand</button>
        <button className="add-recipe-button">Add New Recipe</button>
      </div>
      {showIngredients && (
        <IngredientsOnHand onClose={handleClose} />
      )}
    </div>
  )
}

export default Sidebar;
