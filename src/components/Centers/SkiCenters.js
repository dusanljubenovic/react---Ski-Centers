import React, {  useState, useEffect, useCallback } from 'react';
import {  useDispatch, useSelector } from 'react-redux';

import CenterList from './CenterList';
import ShowCenter from './ShowCenter';
import Search from './Search';

import * as skiCenterActions from '../../store/actions/index';


const Centers = () => {

  const [selectSkiCenter, setSelectSkiCenter] = useState({});

  const dispatch = useDispatch();

  const centers = useSelector(state => {
    return state.centers;
  });




  const onInitLoadCenters = useCallback(
    () => dispatch(skiCenterActions.initLoadSkiCenters()),
    [dispatch]
  );

  


  useEffect(() => {
    onInitLoadCenters();
  },[onInitLoadCenters]);

 





  const fullFillItemHandler = centerObject => {

     centers.map ( ig  => {

           if (ig['id']===centerObject[0]){

                return ig['activ']=true;

           }else{

                return ig['activ']=false;

           }

     });

     setSelectSkiCenter(centerObject);
  
  };


  const clearButtonHandler = () => {

    setSelectSkiCenter({});

    centers.map ( ig  => ( ig['activ']=false ) );
  
  }  



    let showComponents =null;
    
    if (centers!==null){
            showComponents=(
              <React.Fragment>
                <Search selectId={selectSkiCenter} fillHandler={fullFillItemHandler } clearButton={clearButtonHandler} /> 
                <CenterList onFullFillItem={fullFillItemHandler} mainList={true} listCenters={centers} />
                <ShowCenter selectedCenterId={selectSkiCenter} />
              </React.Fragment>
            );
    }

 
  return (
    <div className="App">
         {showComponents}
    </div>
  );
};

export default Centers;
