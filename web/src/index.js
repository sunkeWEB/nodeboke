import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Dashborad from './dashboard/dashboard';
import Error from './commopent/error/error';

ReactDOM.render((
    <BrowserRouter>
        <div style={{height: "100%"}}>
            <Switch>
                <Route path='/' component={Dashborad}/>
                <Route component={Error}/>
            </Switch>
        </div>
    </BrowserRouter>
), document.getElementById('root'));