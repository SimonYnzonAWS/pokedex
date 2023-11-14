import React, { useState } from 'react'

function PokeBattle() {

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
        
    </div>
  );
}

export default App;