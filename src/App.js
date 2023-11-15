import React, { useState } from 'react'

import PokemonBackground from './images/pokemon-background.gif';

import PokeCard from './components/PokeCard';
import SearchModal from './components/SearchModal';
import BattleModal from './components/BattleModal';

import './css/main.css'

const initialPokemonInput = {
  pokemon: ""
}

function App() {

  // ---------------- SEARCH MODAL --------------------
  const [isModalOpenSearch, setModalOpenSearch] = useState(false);
  
  const openModalSearch = () => {
    setModalOpenSearch(true);
  }

  const closeModalSearch = () => {
    setModalOpenSearch(false);
  }
  // ---------------------------------------------------

  // ---------------- BATTLE MODAL --------------------
  const [isModalOpenBattle, setModalOpenBattle] = useState(false);
  
  const openModalBattle = () => {
    setModalOpenBattle(true);
  }

  const closeModalBattle = () => {
    setModalOpenBattle(false);
  }
  // ---------------------------------------------------


  const [pokemonInput, setPokemonInput] = useState(initialPokemonInput);

  const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(true);

  const fetchData = async (input) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}/`);
      const result = await response.json();
      setData(result);
      // console.log("THIS IS FROM FETCH DATA: " + data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setPokemonInput({ ...pokemonInput, [name]: value });
  }

  const handleSubmitSearch = (event) => {
    event.preventDefault();

    let search = pokemonInput.pokemon
    fetchData(search);
    openModalSearch();
  }

  const PokemonBattle = () => {
    openModalBattle();
  }

  return (
    <div className="App">
      <img src={PokemonBackground} className='background--image' alt="Background"/>
      <div className='home--container'>
        <form className='search--form' onSubmit={handleSubmitSearch} autoComplete="off">
          <h1 className='app--title'>Pokédex</h1>
          <input
            className='search--input'
            type="text"
            name="pokemon"
            placeholder="Enter Pokemon Number or Name"
            onChange={handleInputChange}
          />
          <div className='form--footer--container'>
            <input className='search--button' type="submit" value="Search Pokemon"/>
            <input className='battle--button' onClick={PokemonBattle} type="button" value="Pokemon Battle"/>
          </div>
        </form>
      </div>
      <SearchModal 
        isOpenSearch={isModalOpenSearch} 
        onCloseSearch={closeModalSearch}
        pokemonData={data}
      />
      <BattleModal
        isOpenBattle={isModalOpenBattle}
        onCloseBattle={closeModalBattle}
      />
    </div>
  );
}

export default App;
