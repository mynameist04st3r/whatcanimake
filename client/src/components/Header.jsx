import './Header.css';
// import hamburgerIcon from '../../public/hamburger-icon.png';
import { useState } from 'react';

function Header() {
  const [open, setOpen] = useState(false);
  const handleDrawerToggle = () => {
    console.log('Hamburger icon clicked.')
    setOpen(!open);
  };
  return (
    <div className="header-component-container">
      <button onClick={handleDrawerToggle}>
        <img src="/hamburger-icon.png" alt="hamburger icon" />
      </button>
      <h1>What CAN I make?</h1>
    </div>
  );
}
export default Header;
