import React from 'react';
import Logo from './logo.jpg';
import Logo1 from './logo.jpg';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import Login from './../login/login';
import Register from './../register/register';
import {Menu, Dropdown, Button,Icon} from 'antd';

@withRouter
class Headers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logo: '',
            showLoginModel: false,
            showRegisterModel: false,
            islogin: false
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

    handlerouter(e) {
        this.props.history.push(e);
    }

    showCalanModel() {
        this.setState({
            showLoginModel: !this.state.showLoginModel
        });
    }

    showCalanModelregister() {
        this.setState({
            showRegisterModel: !this.state.showRegisterModel
        });
    }

    openModalOther(key) {
        if (key === 'showLoginModel') {
            this.setState({
                showLoginModel: true,
                showRegisterModel: false
            });
        } else if (key === 'showRegisterModel') {
            this.setState({
                showLoginModel: false,
                showRegisterModel: true
            });
        }
    }

    loginSuccess() {
        this.showCalanModel();
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
        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/"><Icon type="setting" /> 设置</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/"><Icon type="logout" /> 登出</a>
                </Menu.Item>
            </Menu>
        );
        return (
            <div className="sk-header" style={{position: 'fixed', top: 0, zIndex: 1, width: '100%'}}>
                <div className="sk-header-item">
                    {this.state.logo ? <img src={"/" + this.state.logo} alt="" className="logo"/> :
                        <img src={Logo} alt="" className="logo"/>}
                    <ul className="menuitem" style={{marginBottom: 0}}>
                        {routers.map(v => {
                            return (
                                <li key={v.name} onClick={() => this.handlerouter(v.path)}>
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
                        {this.state.islogin ? (<div>
                                <li style={{marginRight: 15, color: '#007fff', fontSize: 16}}>
                                    <a href="javascript:void(0)" style={{textDecoration: 'none'}}
                                       onClick={() => this.showCalanModelregister()}>注册</a>
                                </li>
                                <li style={{marginRight: 15, color: '#007fff', fontSize: 16}}>
                                    <a href="javascript:void(0)" style={{textDecoration: 'none'}}
                                       onClick={() => this.showCalanModel()}>登录</a>
                                </li>
                            </div>) :
                            <Dropdown overlay={menu} placement="bottomRight">
                                <img style={{width: 40, height: 40, borderRadius: '50%'}}
                                     src={Logo1} alt=""/>
                            </Dropdown>}
                    </ul>
                    <div>
                        <Login visible={this.state.showLoginModel} closemodel={() => this.showCalanModel()}
                               openOtherModal={(e) => this.openModalOther(e)} loginsuccess={() => this.loginSuccess()}/>
                    </div>
                    <div>
                        <Register visible={this.state.showRegisterModel}
                                  closemodel={() => this.showCalanModelregister()}
                                  openOtherModal={(e) => this.openModalOther(e)}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Headers;