import React from 'react';
import Logo from './logo.jpg';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

@withRouter
class Headers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logo: ''
        }
    }

    componentWillMount() {
        axios.get('/getwzxx').then(res => {
            if (res.status === 200 && res.data.code === 0) {
                const data = res.data.data[0];
                this.setState({
                    logo: data.logo
                });
            }
        });
    }

    handlerouter (e) {
        this.props.history.push(e);
    }

    render() {
        const routers = [
            {
                name: '首页',
                path: '/'
            },
            {
                name: '资源',
                path: '/ziyuan'
            }
        ];
        return (
            <div className="sk-header" style={{position: 'fixed', top: 0, zIndex: 1, width: '100%'}}>
                <div className="sk-header-item">
                    {this.state.logo ? <img src={"/" + this.state.logo} alt="" className="logo"/> :
                        <img src={Logo} alt="" className="logo"/>}
                    <ul className="menuitem" style={{marginBottom: 0}}>
                        {routers.map(v => {
                            return (
                                <li key={v.name} onClick={()=>this.handlerouter(v.path)}>
                                    <a href="javascript:void(0)" style={{textDecoration: 'none'}}>
                                        {v.name}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                    <ul style={{
                        flex: 1,
                        display: 'flex',
                        textAlign: 'center',
                        marginBottom: 0,
                        alignItems: 'center',
                        flexDirection: 'row-reverse'
                    }}>
                        <li style={{marginRight: 15, color: '#007fff', fontSize: 16}}>注册</li>
                        <li style={{marginRight: 15, color: '#007fff', fontSize: 16}}>登录</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Headers;