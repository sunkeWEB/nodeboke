import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {createStore, applyMiddleware, compose} from 'redux'; //applyMiddleware 处理中间件
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducers from "./reduxs";
import Dashborad from './dashboard/dashboard';
import Auth from './auth';

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Auth/>
                <Switch>
                    <Route path='/'  component={Dashborad}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));