import React from 'react';

const Card = ({ item, addNewFavourite, deleteFavourite, userFavourites}) => {

    let userCard = null;
    let addOrDelete = <button onClick={() => addNewFavourite(item)}>Add to favourites +</button>

    if(userFavourites.some(list => list.name ===item.name)){
        addOrDelete = <button onClick={()=>deleteFavourite(item)}>Remove favourite</button>
    }

    if(item.usercard){
        userCard = <span className="userCard">added by user</span>;
    }

    if(item.homeworld){
        return(
            <article className="card">
            <h3>{item.name}</h3>
            <p><span>Birthyear: </span>{item.birth_year}</p>
            <p><span>Homeworld: </span>{item.homeworld}</p>
            {addOrDelete}
            {userCard}
        </article>
        )
    } else {
        return (
            <article className="card">
            <h3>{item.name}</h3>
            <p><span>Climate: </span>{item.climate}</p>
            <p><span>Terrain: </span>{item.terrain}</p>
                {addOrDelete}
                {userCard}
            </article>
        )
    }

}

export default Card;