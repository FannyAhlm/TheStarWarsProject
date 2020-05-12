import React from 'react';

const CategoryBtns = ({choseAll, choseCharacters, chosePlanets, allBtn, characterBtn, planetBtn}) => {

    const showAllButton = <button className={allBtn} onClick={choseAll}>All Favourites</button>

    let displayAllButton = null;

    if(choseAll){
        displayAllButton = showAllButton;
    }

    return(

        <nav className="categories">
            {displayAllButton}
            <button className={characterBtn} onClick={choseCharacters}>Characters</button>
            <button className={planetBtn} onClick={chosePlanets}>Planets</button>
        </nav>

    )
}

export default CategoryBtns;