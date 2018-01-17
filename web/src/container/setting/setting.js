import React from 'react';
import {Switch, Route, BrowserRouter, withRouter} from 'react-router-dom';
import Profiles from './../../commopent/profile/profile';
import UpdatePwd from './../../commopent/updatepwd/updatepwd';
import {connect} from 'react-redux';

@withRouter
    @connect(state=>state.users,{})
class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectitem: ''
        };
    }


    render() {
        const settingsOption = [
            {name: '个人资料', key: '/setting/profile'},
            {name: '修改密码', key: '/setting/updatepwd'}
        ];
        const path = this.props.location.pathname;
        return (
            <div className="sk-body" style={{maxWidth: 900}}>
                {this.props.isAuth? <div className="setting-top sk-body-left">
                    <ul style={{
                        display: 'flex',
                        borderBottom: '1px solid rgba(178, 186, 194, 0.4)',
                        paddingBottom: 10
                    }}>
                        {settingsOption.map(v =>
                            <li style={{marginRight: 15}} key={v.key}
                                onClick={() => this.props.history.push(v.key)}
                            >
                                <a href="javascript:void(0)"
                                   style={{textDecoration: 'none', color: '#ccc'}}
                                   className={path === v.key ? 'activess' : 'noactives'}
                                >
                                    {v.name}
                                </a>
                            </li>
                        )}
                    </ul>
                    <Switch>
                        <Route path="/setting/profile" component={Profiles}/>
                        <Route path="/setting/updatepwd" component={UpdatePwd}/>
                    </Switch>
                </div>:" 页面已经失效 请重新登录"}
            </div>
        )
    }
}

export default Settings;