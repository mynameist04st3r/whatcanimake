import './IngredientsOnHand.css';

function IngredientsOnHand({ onClose }) {

  return (
    <div className="ingredients-on-hand-modal">
      <div className="ingredients-on-hand-modal-content">
        <h2>Ingredients on Hand</h2>
        <button className="close-button" onClick={onClose}>X</button>
        {/* Your ingredients on hand content will go here */}
      </div>
    </div>
  );
}
export default IngredientsOnHand;