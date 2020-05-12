import React from 'react';

const Home = ({showFavs, showSearch}) => {

    return (
        <div className="container">
            <h1>Star Wars</h1>
            <button onClick={()=>showSearch()} className="homeBtn">Search</button>
            <button onClick={()=>showFavs()} className="homeBtn">Favourites</button>
        </div>

    );
}

export default Home;