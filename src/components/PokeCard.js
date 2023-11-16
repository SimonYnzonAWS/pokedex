import React from 'react'

const PokeCard = (props) => {

    return (
        <div>
            <h1 className='search--pokemon--name'>{props.name}</h1>
            <img className='search--pokemon--image' src={props.image} alt='searched pokemon'/>
            <div className='grid--container--pokecard'>
                <div className='grid--container--pokecard--item'>
                    <p className='pokecard--label'>EXP</p>
                </div>
                <div className='grid--container--pokecard--item'>
                    <p className='pokecard--label'>TYPE</p>
                </div>
                <div className='grid--container--pokecard--item'>
                    <p className='pokecard--label'>STAT</p>
                </div>
                <div className='grid--container--pokecard--item'>
                    <p className='pokecard--value'>{props.baseExperience}</p>
                </div>
                <div className='grid--container--pokecard--item'>
                    <p className='pokecard--value'>{props.type}</p>
                </div>
                <div className='grid--container--pokecard--item'>
                    <p className='pokecard--value'>{props.baseStat}</p>
                </div>
            </div>
        </div>
    );
}

export default PokeCard;

