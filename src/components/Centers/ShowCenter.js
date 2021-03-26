import React, { useState, useEffect} from 'react';

import './ShowCenter.css';

const ShowCenter = props => {

    const selectId=props.selectedCenterId;

    const [selectSkiCenter, setSelectSkiCenter ] = useState('');


    const checkValue = ( value ) => {
      
      let valueResponse = '';
      
      valueResponse =  (value !==  'undefine') && (value!=='') ? value : '';
  
      return valueResponse;

    }
 

     useEffect(() => {

            setSelectSkiCenter(<div className="place_holder">Select Ski Center</div>);

            if (selectId[0] === null) {

              setSelectSkiCenter(<div className="place_holder">Doesn't exist Ski Center with that name</div>);
            }

            if ( (selectId[0] !== '') && (selectId[0] !== null)) {

   
            fetch('https://api.fnugg.no/get/resort/' + selectId[0])
              .then(response => {
                return response.json();
              })
              .then(responseData => {
        
             
               const imagePlace = checkValue(responseData['_source']['images']['mobile']['scale1']['small_thumbnail']);

               const temperaturePlace = checkValue(responseData['_source']['conditions']['current_report']['top']['temperature']['value']);
               
               const namePlace = checkValue(responseData['_source']['name']);

               const descriptionPlace = checkValue(responseData['_source']['description']);

               const locationLanPlace = checkValue(responseData['_source']['location']['lat']);

               const locationLonPlace = checkValue(responseData['_source']['location']['lon']);
              
  

                const selectPlace =
                    <div className="place_holder">

                    <div className="place_holder_top">
                           <div className="place_image">
                               <img src={imagePlace} alt="place_image" />
                           </div>
                           <div className="name_and_desc_holder">
                                  <div className="name_holder">
                                         {namePlace}
                                    </div>

                                    <div className="description_holder">
                                         {descriptionPlace}
                                    </div>

                           </div>
                     </div>      
                           
                     <div className="information_holder">
                                   
                                    <div className="temperature_holder">
                                         <strong>Temperature:</strong><span>{temperaturePlace} &#8451;</span>
                                    </div>

                                     <div className="position_holder">
                                         <strong>Position:</strong>
                                         <div>
                                         <span><strong>Lan:</strong>{locationLanPlace}</span>
                                         <span><strong>Lon:</strong>{locationLonPlace }</span>
                                         </div>
                                    </div>   
                      </div>

                    </div>; 

                setSelectSkiCenter(selectPlace);
            
         
              });


            }   

    }, [selectId] );

            


         

     


  return (
    <section className="ski-list">

      
       { selectSkiCenter }
      
    </section>
  );

};

export default ShowCenter;


