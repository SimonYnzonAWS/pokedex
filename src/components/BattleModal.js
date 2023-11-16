import React, { useState, useEffect } from 'react'

import RefreshIcon from '../images/refresh-icon.png';
import PokemonBattle from '../images/Pokemon-Battle.png';

import '../css/main.css'

const BattleModal = ({ isOpenBattle, onCloseBattle}) => {

    const [team1Pokemons, setTeam1Pokemons] = useState([]);
    const [team2Pokemons, setTeam2Pokemons] = useState([]);
    const [team1Total, setTeam1Total] = useState(0);
    const [team2Total, setTeam2Total] = useState(0);
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
  
          const team1 = results.slice(0, 4);
          const team2 = results.slice(4, 8);
  
          setTeam1Pokemons(team1);
          setTeam2Pokemons(team2);
  
          // Total
          const currentTeam1Total = team1.reduce((total, pokemon) => total + pokemon.base_experience, 0);
          const currentTeam2Total = team2.reduce((total, pokemon) => total + pokemon.base_experience, 0);
  
          setTeam1Total(currentTeam1Total);
          setTeam2Total(currentTeam2Total);
  
          // Compare Total
          if (currentTeam1Total > currentTeam2Total) {
            setWinner('Team 1');
          } else if (currentTeam2Total > currentTeam1Total) {
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
      startNewBattle();
    }, [isOpenBattle]);

    if (!isOpenBattle) {
        return null;
    }

    return (
      <div className='modal--background'>
        <div className='modal--content--battle'>
          <div className='modal--header'>
            <p className='close--button' onClick={onCloseBattle}>&times;</p>
          </div>
          <img src={PokemonBattle} className='pokemon--battle--text' alt="Pokemon Battle Text"/>
          <p className='modal--result--label'>WINNER</p>
          <h2 className='modal--result--battle'>{winner && `${winner}`}</h2>
          <div className='teams--container'>
        
            <div className='team1--container'>
              <h3 className='team1--label'>Team 1</h3>
              <h3 className='team1--total'>{team1Total}</h3>
              <div className='grid--container'>
                {team1Pokemons.map((pokemon, index) => (
                <div key={index.toString()} className='grid--item'>
                    <h4 className='battle--card--name1'>{pokemon.name}</h4>
                    <p className='battle--card--label'>EXP</p>
                    <p className='battle--card--experience--num'>{pokemon.base_experience}</p>
                    <div className='battle--card--background'>
                      <img className='battle--card--image' src={pokemon.sprites.front_default} alt='battle pokemon'/>
                    </div>
                </div>
                ))}
              </div>
            </div>
  
            <div className='team2--container'>  
              <h3 className='team2--label'>Team 2</h3>
              <h3 className='team2--total'>{team2Total}</h3>
              <div className='grid--container'>
                {team2Pokemons.map((pokemon, index) => (
                  <div key={index.toString()} className='grid--item'>
                    <h4 className='battle--card--name2'>{pokemon.name}</h4>
                    <p className='battle--card--label'>EXP</p>
                    <p className='battle--card--experience--num'>{pokemon.base_experience}</p>
                    <div className='battle--card--background'>
                      <img className='battle--card--image' src={pokemon.sprites.front_default} alt='battle pokemon'/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
          <button className='battle--card--refresh' onClick={startNewBattle}>
            <img 
                src={RefreshIcon}
                className='refresh--icon'
                alt='refresh'
            />
          </button>
        </div>
      </div>
    );
  }
  
  export default BattleModal;