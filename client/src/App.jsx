import HeaderBar from './components/HeaderBar';
import Sidebar from './components/Sidebar';
// import TopTen from './components/TopTen';
// import SelectedRecipes from './components/SelectedRecipes';
// import ShoppingList from './components/ShoppingList';
import './App.css';

function App() {

  return (
    <div className="app-main-container-app">
      <div className="header-container-app">
        <HeaderBar />
      </div>
      <div className="main-container-app">
        <div className="sidebar-container-app">
          <Sidebar />
        </div>
        <div className="right-container-app" style={{zIndex: -1}}>
          <div className="topten-app">
            Top Ten Recipes
            {/* <TopTen /> */}
          </div>
          <div className="bottom-container-app">
            <div className="selected-recipes-app">
              Selected Recipes
              {/* <SelectedRecipes /> */}
            </div>
            <div className="shopping-list-app">
              Shopping List
              {/* <ShoppingList /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
