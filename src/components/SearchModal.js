import React, { useState } from 'react'

import PokeCard from './PokeCard';

import '../css/main.css'

const SearchModal = ({ isOpenSearch, onCloseSearch, pokemonData}) => {
    if (!isOpenSearch || !pokemonData) {
      return null;
    }

    console.log(pokemonData);
    return (
        <div className='modal--background'>
            <div className='modal--content'>
                <div className='modal--header'>
                    <p className='close--button' onClick={onCloseSearch}>&times;</p>
                </div>
                <PokeCard 
                    name={pokemonData.forms[0].name}
                    // image={pokemonData.sprites.other.home.front_default}
                    // image={pokemonData.sprites.other["official-artwork"].front_default}
                    image={pokemonData.sprites.front_default}
                    baseExperience={pokemonData.base_experience}
                    baseStat={pokemonData.stats[0].base_stat}
                    type={pokemonData.types[0].type.name}
                />
            </div>
        </div>
    );
}

export default SearchModal;