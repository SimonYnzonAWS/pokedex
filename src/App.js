import React, { useState } from 'react'
import PokeCard from './components/PokeCard';

const initialPokemonInput = {
  pokemon: ""
}

function App() {

  const [pokemonInput, setPokemonInput] = useState(initialPokemonInput)

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (input) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}/`);
      const result = await response.json();
      setData(result);
      console.log(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setPokemonInput({ ...pokemonInput, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    let search = pokemonInput.pokemon
    fetchData(search);
  }

  return (
    <div className="App">
        <h1>Pokédex</h1>
        <form onSubmit={handleSubmit} autoComplete="off">
          <input
            type="text"
            name="pokemon"
            placeholder="Enter Pokemon Number or Name"
            onChange={handleInputChange}
          />
          <input type="submit" value="search pokemon"/>
        </form>
        <input type="button" value="pokemon battle"/>
        <div>
          {data ? (
            <PokeCard 
              name={data.forms[0].name}
              //image={data.sprites.other.home.front_default}
              //image={data.sprites.other["official-artwork"].front_default}
              image={data.sprites.front_default}
            />
          ) : (
            <p></p>
          )}
        </div>
    </div>
  );
}

export default App;
