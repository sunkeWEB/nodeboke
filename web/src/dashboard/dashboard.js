import React from 'react';
import './../index.css';
import Headers from './../commopent/header/header';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Home from './../container/home/home';
import Ziyuan from "../container/ziyuan/ziyuan";
import AriticBody from './../commopent/ariticbody/ariticbody';
import Settings from './../container/setting/setting';
import Timexz from './../container/about/about';

class Dashborad extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="sk">
                    <Headers/>
                    <div>
                        <Switch>
                            <Route path="/ziyuan" component={Ziyuan}/>
                            <Route path="/setting" component={Settings}/>
                            <Route path="/timexz" component={Timexz}/>
                            <Route path="/wenzan/:id" component={AriticBody}/>
                            <Route path="/" component={Home}/>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

export default Dashborad;