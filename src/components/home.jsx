import React from 'react';

const Home = ({showFavourites, showSearch}) => {

    return (
        <div className="container">
            <h1>Star Wars</h1>
            <button onClick={showSearch} className="homeBtn">Search</button>
            <button onClick={showFavourites} className="homeBtn">Favourites</button>
        </div>

    );
}

export default Home;