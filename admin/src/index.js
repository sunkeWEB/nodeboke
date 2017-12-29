import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux'; //applyMiddleware 处理中间件
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import reducer from './redux';
import Login from './component/login/login';
import App from './App';
import './app.css';
import AuthRoute from './component/auth/auth';

const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <div style={{height:"100%"}}>
                <AuthRoute/>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/app" component={App}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));