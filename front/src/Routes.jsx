import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import Login from './pages/Login/index';
import Home from './pages/Home/index';
import Recipe from './pages/Recipe/index';


function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/home' component={Home} />
                <Route path='/recipe' component={Recipe} />
                <Redirect from='*' to='/' />
            </Switch>
        </BrowserRouter>

    );
}

export default Routes;



