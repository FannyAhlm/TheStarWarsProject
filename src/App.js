import React, { useState, useEffect } from 'react';
import './App.css';
import Search from './components/Search';
import Favourites from './components/favourites';
import Header from './components/Header';
import Home from './components/home';

function App() {

  const HOMESCREEN = 'homescreen' ,SEARCHSCREEN = 'searchscreen', FAVOURITESCREEN = 'favouritescreen';

  const [screen, setScreen] = useState(HOMESCREEN);

  const [characterList, setCharacterList] = useState([]);
  const [planetList, setPlanetList] = useState([]);
  const [userFavourites, setUserFavourites] = useState([]);

              // API CALLS HER//

  const baseUrl = 'https://swapi.dev/api/';

  async function getCharacterList(){
      let wholeList = [];
      let getNewPeople = `${baseUrl}people/`;

      while(getNewPeople){
        const response = await fetch(getNewPeople);
        const data = await response.json();

        data.results.forEach(listItem =>{
          wholeList.push(listItem);
        })
        if(data.next){
          getNewPeople = data.next.replace('http', 'https');
        } else {
          getNewPeople = data.next;
        }
      }
      
     let promisesWithPlanetNames = wholeList.map(async character => {
         const response = await fetch(character.homeworld);
         const data = await response.json();
         character.homeworld = data.name;
         return character

     });
     const listWithPlanetNames = await Promise.all(promisesWithPlanetNames);
     setCharacterList(listWithPlanetNames);
  }

  async function getPlanetList(){
    let wholeList = [];
    let getNewPlanets = `${baseUrl}planets/`;

    while(getNewPlanets){
      const response = await fetch(getNewPlanets);
      const data = await response.json();

      data.results.forEach(listItem =>{
        wholeList.push(listItem);
      })
      if(data.next){
        getNewPlanets = data.next.replace('http', 'https');
      } else {
        getNewPlanets = data.next;
      }
    }

      setPlanetList(wholeList);
  }

  useEffect(() => {
      getCharacterList();
      getPlanetList();

  } ,[])

              // END OF API CALL//
  
  function addNewFavourite(item){
    if(!userFavourites.some(card => card.name === item.name)){
      setUserFavourites([item , ...userFavourites]);
    }
  }

  function deleteFavourite(item){
    let newFavouriteList = [...userFavourites];
    newFavouriteList = newFavouriteList.filter((listItem)=>{
      return listItem.name !== item.name;
    })
    setUserFavourites(newFavouriteList);
  }
  

  /// Here we decide what component shows when ///

  const header = <Header screen={screen}
  showSearch={()=>setScreen(SEARCHSCREEN)}
  showFavs={()=>setScreen(FAVOURITESCREEN)}
  showHome={()=>setScreen(HOMESCREEN)}/>;

  let content = null;
  switch (screen){

    case SEARCHSCREEN:
      content = <Search characterList={characterList}
                        planetList={planetList}
                        addNewFavourite={addNewFavourite}
                        userFavourites={userFavourites}
                        deleteFavourite={deleteFavourite}>
                    {header}
                </Search>
      break;

    case FAVOURITESCREEN:
        content = <Favourites 
        userFavourites={userFavourites}
        deleteFavourite={deleteFavourite}
        addNewFavourite={addNewFavourite}>
                    {header}
                  </Favourites>
        break;

      default:
        content = <Home showSearch={()=>setScreen(SEARCHSCREEN)}
        showFavs={()=>setScreen(FAVOURITESCREEN)}/>

  }

  return (
    <div className="App">
      <div className="blur"></div>
      {content}
    </div>
  );
}

export default App;