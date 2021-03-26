import React, { useState, useEffect, useRef } from 'react';
import {  useSelector } from 'react-redux';

import Card from '../UI/Card';
import Modal from '../UI/Modal/Modal';
import Spinner from '../UI/Spinner/Spinner';
import './Search.css';
import CenterList from './CenterList';

const Search = React.memo(props => {

  const [currentArray, setCurrentArray] = useState('');
  const [showSpinner, setShowSpinner] = useState('');

  const [enteredFilter, setEnteredFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef();

  const selectObject = props.selectId;

  const fillHandlerFunction = props.fillHandler;

  const centers = useSelector(state => {
    return state.centers;
  });

   if (  selectObject[0] === undefined ) {

      selectObject[0]='';
      selectObject[1]='';

   }
   
  useEffect(() => {

    let temp_array_centers=[''];

    setShowSpinner(true);
 
    const timer = setTimeout(() => {     


      if (enteredFilter === inputRef.current.value) {

            const query =
            enteredFilter.length === 0
            ? ''
            : enteredFilter;
        
              temp_array_centers = centers.filter(center => center['name'].indexOf(query)>=0 );

              if (temp_array_centers.length===0){
                setShowSpinner(false);
              }

             setCurrentArray(temp_array_centers);

             
           
      }


    }, 500);

    return () => {
      clearTimeout(timer);
    };

    
  }, [enteredFilter, inputRef, centers]);


  useEffect(() => {

    setEnteredFilter(selectObject[1]);

    setShowModal(false);
    
   
  }, [selectObject]);



  const closedModalHandler = () => {

    setShowModal(false);
       
  };

  const submitHandler = ( event ) => {

    event.preventDefault();

    let current_id=null;
    let current_name=enteredFilter;
    let current_activ=false;

    let array_cur=null;
   
     array_cur = centers.filter(center => center['name']===enteredFilter);
 
    if (array_cur.length>0){

      current_id = array_cur[0]['id'];
      current_name = array_cur[0]['name'];
      current_activ = true;

    }

     inputRef.current.blur();


     return props.fillHandler([ current_id, current_name, current_activ ]);

  }


  let changeSpinner = showSpinner ? <Spinner /> : <section className="ski-list"><ul><li><span>Incorrect value</span></li></ul></section>;

  


  let searchListCenters = currentArray.length === 0 ?  changeSpinner : <CenterList onFullFillItem={fillHandlerFunction}  mainList={false}  listCenters={currentArray} />;


  return (
    <section className="search">
     <form onSubmit={submitHandler}>
         <Card>
           <div className="search-input">
             <input
               ref={inputRef}
               type="text"
               value={enteredFilter}
               onChange={event => setEnteredFilter(event.target.value)}
               onFocus={event => setShowModal(true)}
               placeholder="Choose Ski Center..."
              />
          </div>
           <div className="clear-button" onClick={props.clearButton} >
             X
           </div>
        </Card>
      </form>
         { showModal &&  
             <Modal show={showModal} modalClosed={closedModalHandler}>
                {searchListCenters}
             </Modal>
          }
    </section>
  );
});

export default Search;
