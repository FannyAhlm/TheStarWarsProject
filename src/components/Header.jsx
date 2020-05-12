import React from 'react';

const Header = ({screen, showSearch, showFavs, showHome})=> {

    let goTo = 'Favourites';

    if(screen === 'favouritescreen'){
        goTo = 'Search';
    };

    const screenLink = () => {
        return goTo === 'Favourites' ? showFavs() : showSearch();
    }

    return (

        <header>
            <nav> 
                <span onClick={screenLink}>To {goTo}</span>
                <span onClick={()=>showHome()}>Home</span>
            </nav>
        </header>

    )
}

export default Header;