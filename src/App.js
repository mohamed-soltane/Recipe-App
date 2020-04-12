import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';

const  App = () => {

  const APP_ID = "95ba7448";
  const APP_KEY = "4cae2c13f8f7cfc1a80af1edae9a0e3a";
  
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');



   useEffect(() => {
     getRecipes();
   }, [query]);

   const getRecipes = async () =>{
     const response = await fetch(  `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
     const data = await response.json();
     setRecipes(data.hits);
  
    };
    const updateSearch = e => {
     setSearch(e.target.value);
     console.log(search);
    }

    const getSearch = e =>{
      e.preventDefault();
      setQuery(search);
    }


  return (
    <div className="App">
      <form onSubmit={getSearch} className="search_bar">
        <input className="search-bar" type="text"  onChange={updateSearch} />
        <button className="search-button" type="submit" >Search</button>


      </form>
      {recipes.map(recipe =>(
        <Recipe 
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        />
      ))}
        
    </div>
  );
}

export default App;