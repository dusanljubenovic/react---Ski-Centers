import React from 'react';

import classes from './Spinner.module.css';

const spinner = () => (
    <section className="ski-list">
        <ul>
         
              <span className={classes.Loader}>Loading...</span>
          
        </ul>
     </section>
);

export default spinner;