import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Profiles from './../../commopent/profile/profile';
import UpdatePwd from './../../commopent/updatepwd/updatepwd';

class Settings extends React.Component {
    render() {
        const settingsOption = [
            {name: '个人资料', key: '/setting/profile'},
            {name: '修改密码', key: '/setting/updatepwd'}
        ];
        return (
            <div className="sk-body" style={{maxWidth: 900}}>
                <div className="setting-top sk-body-left">
                    <ul style={{
                        display: 'flex',
                        borderBottom: '1px solid rgba(178, 186, 194, 0.4)',
                        paddingBottom: 10
                    }}>
                        {settingsOption.map(v =>
                            <li style={{marginRight: 15}} key={v.key} onClick={()=>this.props.history.push(v.key)}><a href="javascript:void(0)"
                                                             style={{textDecoration: 'none'}}>{v.name}</a></li>
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Settings;