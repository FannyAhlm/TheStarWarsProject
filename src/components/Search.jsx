import React, { useState } from 'react';
import Card from './Card';
import CategoryBtns from './CategoryBtns';

const Search = ({children, characterList, planetList, addNewFavourite, userFavourites, deleteFavourite}) => {

    const [showCategory, setShowCategory] = useState('characters');

    const [searchLetters, setSearchLetters] = useState('');

    let characterBtn = '', planetBtn = '';

    function createCard(item){
        return(
            <Card key={item.name}
            item={item}
            addNewFavourite={addNewFavourite}
            userFavourites={userFavourites}
            deleteFavourite={deleteFavourite}>
            </Card>
        )
    }

    let planetCards = planetList.filter(planet => planet.name.toLowerCase().includes(searchLetters.toLowerCase()) 
    || planet.climate.toLowerCase().includes(searchLetters.toLowerCase())
    || planet.terrain.toLowerCase().includes(searchLetters.toLowerCase()))
    .map( item => createCard(item));

    let characterCards = characterList.filter(person => person.name.toLowerCase().includes(searchLetters.toLowerCase()) 
    || person.birth_year.toLowerCase().includes(searchLetters.toLowerCase())
    || person.homeworld.toLowerCase().includes(searchLetters.toLowerCase()))
    .map(item => createCard(item));

    let showList = characterCards;

    if(showCategory === 'planets'){
        showList = planetCards;
        planetBtn = 'active';
    }
    if(showCategory === 'characters'){
        characterBtn = 'active';
    }

    return (
        <>
            {children}
            <div className="backdrop">
                <label htmlFor="searchfield"><h2>Search:</h2></label>
                <input onChange={e=> setSearchLetters(e.target.value)}
                id="searchfield" type="text"/>
                <CategoryBtns choseCharacters={() => setShowCategory('characters')}
                chosePlanets={()=>setShowCategory('planets')}
                characterBtn={characterBtn}
                planetBtn={planetBtn}/>
                <section className="cards">
                    {showList}
                </section>
            </div>

        </>
    )
}
export default Search;