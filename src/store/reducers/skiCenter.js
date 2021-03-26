import * as actionTypes from '../actions/actionTypes';


const initialState = {
    centers:null,
    error:false
};



const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
      
        case actionTypes.LOADED_SKI_CENTERS:
        
               const skiCentersArray = [];

               action.centers.map( (skicenter) => {

                  
                    skiCentersArray.push({                           
                      id: skicenter['_source']['id'],
                      name: skicenter['_source']['name'], 
                      temperature:skicenter['_source']['conditions']['current_report']['top']['temperature']['value'],
                      activ:false
                   });

                   return skiCentersArray;
                   
                 });
        

               return{
                   ...state,
                    centers:skiCentersArray,
                    error:false
               };
        
        case actionTypes.LOADED_SKI_CENTERS_FAILED:    
               return{
                   ...state,
                   error:true
               };       

        default:
            return state;
    }

    
};

export default reducer;



