import React, { useState } from 'react';

const FormComponent = ({addNewFavourite}) => {

    const [formType, setFormType] = useState('character');
    const [pickedCardType, setPickedCardType] = useState(false);

    const[name, setName] = useState('');
    const [opt1, setOpt1] = useState('');
    const [opt2, setOpt2] = useState('');

    /// Validation stuff in here ///

    const [nameTouched, setNameTouched] = useState(false);
    const [opt1Touched, setOpt1Touched] = useState(false);
    const [opt2Touched, setOpt2Touched] = useState(false);

    const MAXIMUMCHARACTERERROR = 'No more than 25 characters allowed';
    const NUMBERSERROR = "Can only contain letters";

    let correctForm = false;
    let validatedName = false;
    let validatedOpt1 = false;
    let validatedOpt2 = false;

    //Name Validation//

    let nameRegex = /^[a-z]+[a-z0-9-\s]+$/i;
    let nameStartRegex = /^[a-z]/i;

    let nameCss = '';
    let nameError = '2 characters required'
    if(nameTouched && !nameRegex.test(name) && name.length > 1){

        if(!nameStartRegex.test(name)){
            nameCss = 'error';
            nameError = 'Must start with a letter';
        } else{
            nameCss = 'error';
            nameError = "Can't contain special charcters";
        }
    }
    if(nameTouched && name.length < 2){
        nameCss = 'error';
    } else if(nameTouched && name.length > 25){
        nameCss = 'error';
        nameError = MAXIMUMCHARACTERERROR;
    } else if (nameTouched){
        validatedName = true;
    }

    // Option 1 Validation //

    let ageRegex = /^[\d]+\s?(bby|aby)/i;
    let climateTerrainRegex = /^[a-z\s,]+$/i;
    let homeworldRegex = /^[a-z]+$/i;
    let spacesRegex = /\s/;

    let opt1css = '';
    let opt1error = MAXIMUMCHARACTERERROR;

    if(formType === 'planet'){
        if(opt1Touched && opt1.length > 25){
            opt1css = 'error';
        } else if(opt1Touched && opt1.length > 0 && !climateTerrainRegex.test(opt1)){
            opt1error = NUMBERSERROR;
            opt1css = 'error';
        } else{
            validatedOpt1 = true;
        }
    } else{
        if(opt1Touched && opt1 && !ageRegex.test(opt1)){
            opt1error ='Format should be: year + bby/aby';
            opt1css = 'error';
        } else{
            validatedOpt1 = true;
        }
    }

    // Option 2 Validation //

    let opt2css = '';
    let opt2error = MAXIMUMCHARACTERERROR;
    if(formType === 'planet'){
        if(opt2Touched && opt2.length > 25){
            opt2css = 'error';
        }else if(opt2Touched && opt2.length > 0 && !climateTerrainRegex.test(opt2)){
            opt2css = 'error';
            opt2error = NUMBERSERROR;
        }
        else{
            validatedOpt2 = true;
        }

    } else {
        if(opt2Touched && opt2.length > 25){
            opt2css = 'error';
        } else if(opt2Touched && opt2.length > 0 && !homeworldRegex.test(opt2)){
            opt2css = 'error';
            if(spacesRegex.test(opt2)){
                opt2error = 'Only one planet allowed';
            } else{
                opt2error = NUMBERSERROR;
            }
        } else{
            validatedOpt2 = true;
        }
    }

    if(validatedName && pickedCardType && validatedOpt1 && validatedOpt2){
        correctForm = true;
    }


    /// End of validation stuff ///
    

    const radioButtonPicked = (cardType) => {
        setFormType(cardType);
        setPickedCardType(true)
    }

    const emptyFormFields = () => {
        setName('');
        setOpt1('');
        setOpt2('');
    }

    const handleSubmit = (event)=>{
        event.preventDefault();

        let firstOption = opt1;
        if(!firstOption){
            firstOption = 'unknown';
        }
        let secondOption = opt2;
        if(!secondOption){
            secondOption = 'unknown';
        }

        if(formType === "character"){
            addNewFavourite({
                name: name,
                birth_year: firstOption,
                homeworld: secondOption,
                usercard: true
            })

        } else {
            addNewFavourite({
                name: name,
                climate: firstOption,
                terrain: secondOption,
                usercard: true
            })
        }
        emptyFormFields();
        setNameTouched(false);
    }

    let formLabel = ['Birthyear: ', 'Homeworld: '];
    if(formType === 'planet'){
        formLabel = ['Climate: ', 'Terrain: ']
    }

    return(
    <form>
        <h3 className="form">Add new favourite</h3>
        <div> 
            <label htmlFor="name">Name: </label>
            <input onChange={e => setName(e.target.value)}
            onBlur={()=> setNameTouched(true)} id="name" type="text" value={name}/> 
        </div>
        <p className={nameCss}>{nameError}</p>
        <div>
            <label className="radioLabel" htmlFor="character">Character: </label>
            <input onClick={()=>radioButtonPicked('character')} 
            type="radio" name="cardType" id="character"/>

            <label className="radioLabel" htmlFor="planet">Planet: </label>
            <input onClick={()=>radioButtonPicked('planet')}
            type="radio" name="cardType" id="planet"/>
        </div>
        <p className="visible">Following fields evaluates to 'unknown' if left empty:</p>
        <div> 
            <label htmlFor="opt1">{formLabel[0]} </label>
            <input onChange={e => setOpt1(e.target.value)}
            onBlur={()=> setOpt1Touched(true)} 
            value={opt1} disabled={!pickedCardType} 
            id="opt1" type="text"/> 
        </div>
        <p className={opt1css}>{opt1error}</p>
        <div> 
            <label htmlFor="opt2">{formLabel[1]} </label>
            <input onChange={e => setOpt2(e.target.value)} 
            onBlur={()=> setOpt2Touched(true)} 
            value={opt2} disabled={!pickedCardType} 
            id="opt2" type="text"/> 
        </div>
        <p className={opt2css}>{opt2error}</p>
        <button onClick={(event)=>handleSubmit(event)}
        disabled={!correctForm}
        >Add</button>
    </form>)

}

export default FormComponent;