import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './../index.css';
import Headers from './../commopent/header/header';
import Navmenu from './../commopent/navmenu/navmenu';
import AriticList from './../commopent/ariticlist/ariticlist';
import UserInfo from './../commopent/userinfo/userinfo';

class Dashborad extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="sk">
                    <Headers/>
                    <div className="sk-body">
                        <div className="sk-body-left">
                            <Navmenu/>
                            <AriticList/>
                        </div>
                        <div className="sk-body-right">
                            <UserInfo/>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

export default Dashborad;