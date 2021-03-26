import * as actionTypes from './actionTypes';

export const startLoadingSkiCenters = () => {
    return{
         type:actionTypes.START_LOADING_SKI_CENTERS
    };
};


export const loadedSkiCenters = (centers) => {
      return{
           type:actionTypes.LOADED_SKI_CENTERS,
           centers:centers
      };
};

export const loadedSkiCentersFailed = () => {
    return{
         type:actionTypes.LOADED_SKI_CENTERS_FAILED
    };
};

export const initLoadSkiCenters = () => {
    
    return dispatch => {

        dispatch(startLoadingSkiCenters());

        fetch('https://api.fnugg.no/search')
        .then(response => {
                return response.json();
        })
        .then( responseData => {

             dispatch(loadedSkiCenters(responseData['hits']['hits']));

        } )
        .catch( error => {
         
            dispatch(loadedSkiCentersFailed());

        } );

            


    };
};

