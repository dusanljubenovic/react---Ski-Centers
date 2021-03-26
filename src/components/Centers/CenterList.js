import React from 'react';

import './CenterList.css';

const CenterList = props => {

  const currentList = props.listCenters;

  return (
    <section className="ski-list">

    { props.mainList ?   <h2>Ski Centers:</h2> : null } 

      <ul>
        { currentList.map ( ig  => (
              
            <li key={ props.mainList ? 'main_list_' + ig['id'] : ig['id'] } onClick={ () => props.onFullFillItem([ ig['id'], ig['name'], ig['activ']=true ])  }  className={ig['activ'] ? 'activ_item': null }  > 
              <span>{ ig['name'] }</span>
              { (ig['temperature'] !== null)  ? <span>{ig['temperature']} &#8451;</span>: null } 
            </li>
         
        ))}
      </ul>
    </section>
  );
};

export default CenterList;


