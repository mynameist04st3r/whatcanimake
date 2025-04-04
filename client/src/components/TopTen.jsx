// useState, useEffect w/ fetch
import { useState, useEffect } from 'react'

function TopTen() {


useEffect(() => {
  fetch('http://localhost:8000/recipes')
  .then(res => res.json())
  .then(data => console.log(data))
}, []);
return <h1>Woot!</h1>
}

export default TopTen
