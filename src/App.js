import React, { useState } from 'react';
import './App.css';
import Home from './components/home';
import Search from './components/Search';
import Favourites from './components/favourites';

function App() {

  const HOMESCREEN = 'homescreen' ,SEARCHSCREEN = 'searchscreen', FAVOURITESCREEN = 'favouritescreen';

  const [screen, setScreen] = useState(SEARCHSCREEN);

  const [userFavourites, setUserFavourites] = useState([]);

  let content = null;
  switch (screen){
    case SEARCHSCREEN:
      content = <Search/>
      break;
    case FAVOURITESCREEN:
        content = <Favourites/>
        break;
      default:
        content = <Home showFavourites={() => setScreen(FAVOURITESCREEN)}
        showSearch={() => setScreen(SEARCHSCREEN)}/>

  }

  return (
    <div className="App">
      <div className="blur"></div>
      {content}
    </div>
  );
}

export default App;