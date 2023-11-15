import React, { useState, useEffect } from 'react'

import PokeCard from './PokeCard';

import '../css/main.css'

const BattleModal = ({ isOpenBattle, onCloseBattle}) => {

    const [combinedPokemons, setCombinedPokemons] = useState(null);
    const [winner, setWinner] = useState(null);

    const generateRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const fetchData = async (input) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}/`);
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const startNewBattle = () => {
        const randomPokemon = [];
        for (let i = 0; i < 8; i++) {
            const randomNum = generateRandomNumber(1, 400);
            randomPokemon.push(randomNum);
        }

    console.log("Generated Numbers:", randomPokemon);

    const pokemonFetchPromises = randomPokemon.map(number => fetchData(number));

    Promise.all(pokemonFetchPromises)
      .then(results => {
        console.log("All data fetched:", results);
        const combinedPokemons = results.reduce((acc, result, index) => {
          acc[randomPokemon[index]] = result;
          return acc;
        }, {});
        setCombinedPokemons(combinedPokemons);

        // Determine the winner
        const team1 = randomPokemon.slice(0, 4);
        const team2 = randomPokemon.slice(4, 8);
        const team1TotalExperience = team1.reduce((total, num) => total + combinedPokemons[num].base_experience, 0);
        const team2TotalExperience = team2.reduce((total, num) => total + combinedPokemons[num].base_experience, 0);

        if (team1TotalExperience > team2TotalExperience) {
          setWinner('Team 1');
        } else if (team2TotalExperience > team1TotalExperience) {
          setWinner('Team 2');
        } else {
          setWinner('It\'s a tie!');
        }
      })
      .catch(error => {
        console.error('Error during Promise.all:', error);
      });
  };

  useEffect(() => {
    // Trigger a new battle when the component mounts
    startNewBattle();
  }, []); // Empty dependency array to trigger the effect only once

    if (!isOpenBattle) {
        return null;
    }

    return (
        <div className='modal--background'>
            <div className='modal--content'>
                <div className='modal--header'>
                    <p className='close--button' onClick={onCloseBattle}>&times;</p>
                </div>
                {combinedPokemons && (
                    <div>
                    {combinedPokemons && (
                        <div>
                        <h1>Pokemon Battle</h1>
                        <h2>{winner && `Winner: ${winner}`}</h2>
                        {Object.entries(combinedPokemons).map(([pokemonNumber, pokemonData]) => (
                            <div key={pokemonNumber}>
                            <h3>{pokemonData.name}</h3>
                            <p>Base Experience: {pokemonData.base_experience}</p>
                            {/* Add more information as needed */}
                            </div>
                        ))}
                        <button onClick={startNewBattle}>Start New Battle</button>
                        </div>
                    )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default BattleModal;