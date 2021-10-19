import React from 'react';
import  List from './List';
import Form from '../Products/Form';
import { Route, Switch } from 'react-router-dom';
import { Product } from 'core/types/Product';

const Categories = () => {
    return (
       <div>
           <Switch>
               <Route path="/admin/categories" exact>
                  <List />
               </Route>
               
           </Switch>
       </div>
    );
}

export default Categories; 