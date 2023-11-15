import React from 'react'

const PokeCard = (props) => {

    return (
        <div>
            <h1 className='search--pokemon--name'>{props.name}</h1>
            <img className='search--pokemon--image' src={props.image} alt='pokemon image'/>
            <div>
                <p>{props.baseExperience}</p>
                <p>{props.baseStat}</p>
                <p>{props.type}</p>
            </div>
        </div>
    );
}

export default PokeCard;

