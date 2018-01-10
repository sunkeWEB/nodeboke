import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Dashborad from './dashboard/dashboard';

ReactDOM.render((
    <BrowserRouter>
        <div style={{height: "100%"}}>
            <Switch>
                <Dashborad path='/' component={Dashborad} />
            </Switch>
        </div>
    </BrowserRouter>
), document.getElementById('root'));