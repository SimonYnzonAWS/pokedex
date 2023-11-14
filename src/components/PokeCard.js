import React from 'react'

const PokeCard = (props) => {

    return (
        <div>
            <p>{props.name}</p>
            <img src={props.image}/>
        </div>
    );
}

export default PokeCard;

