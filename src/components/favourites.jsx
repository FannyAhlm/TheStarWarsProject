import React, { useState } from 'react';
import Card from './Card';
import CategoryBtns from './CategoryBtns';
import FormComponent from './FormComponent';

const Favourites = ({children, userFavourites, deleteFavourite, addNewFavourite}) => {

    const [showCategory, setShowCategory] = useState('all');

    function cardCreator(item){
        return (
            <Card key={item.name} item={item}
            deleteFavourite={deleteFavourite}
            userFavourites={userFavourites}>
            </Card>
        )
    }

    let allBtn = '', characterBtn = '', planetBtn = '';

    let showFavourites = userFavourites.map(item => cardCreator(item));

    if(showCategory === 'characters'){
        showFavourites = userFavourites.filter(item => item.homeworld)
        .map((item)=> cardCreator(item));

        characterBtn = 'active';
    }
    if(showCategory === 'planets'){
        showFavourites = userFavourites.filter(item => item.climate)
        .map(item => cardCreator(item));

        planetBtn = 'active';
    }
    if(showCategory === 'all'){
        allBtn = 'active';
    }

    return(
        <div>
            {children}
            <div className="backdrop">
            <h2> Your Favourites</h2>
            <FormComponent addNewFavourite={addNewFavourite}/>
            <CategoryBtns 
                choseAll={()=> setShowCategory('all')}
                choseCharacters={() => setShowCategory('characters')}
                chosePlanets={()=>setShowCategory('planets')}
                allBtn={allBtn}
                characterBtn={characterBtn}
                planetBtn={planetBtn}/>
            <section className="cards">
            {showFavourites}
            </section>
            </div>
        </div>
    )
}

export default Favourites;