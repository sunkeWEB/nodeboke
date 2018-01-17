import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import Login from './../login/login';
import Register from './../register/register';
import {Menu, Dropdown, Icon} from 'antd';
import browserCookies from 'browser-cookies';
import {connect} from 'react-redux';
import {Logout} from './../../reducer/user.redux';

@withRouter
@connect(state => state.users, {Logout})
class Headers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logo: '',
            showLoginModel: false,
            showRegisterModel: false,
            islogin: false,
            useravatar: '',
            isselect: '/'  // 默认选择首页
        }
    }

    componentWillMount() {
        console.log("asa");
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
        this.setState({
            isselect: e
        });
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

    logout() {
        browserCookies.erase('userids');
        this.props.history.push('/');  // 用户登出之后 不能看到页面  退出到首页
        this.props.Logout();
    }

    render() {
        const routers = [
            {
                name: '首页',
                path: '/'
            },
            {
                name: '我们',
                path: '/timexz'
            }
        ];
        const menu = (
            <Menu>
                <Menu.Item>
                    <Icon type="setting"/> <span onClick={() => this.props.history.push('/setting')}>设置</span>
                </Menu.Item>
                <Menu.Item>
                    <Icon type="logout"/> <span onClick={() => this.logout()}>登出</span>
                </Menu.Item>
            </Menu>
        );
        return (
            <div className="sk-header" style={{position: 'fixed', top: 0, zIndex: 1, width: '100%'}}>
                <div className="sk-header-item">
                    <img src={"/" + this.state.logo} alt="" className="logo"/>
                    <ul className="menuitem" style={{marginBottom: 0}}>
                        {routers.map(v => {
                            return (
                                <li key={v.name} onClick={() => this.handlerouter(v.path)}>
                                    <a className={this.state.isselect === v.path ? 'seleceheader' : ''}
                                       href="javascript:void(0)" style={{textDecoration: 'none', color: '#71777c'}}>
                                        {v.name}
                                    </a>
                                </li>
                            )
                        })
                        }
                    </ul>


                    <ul style={{
                        flex: 1,
                        display: 'flex',
                        textAlign: 'center',
                        marginBottom: 0,
                        alignItems: 'center',
                        flexDirection: 'row-reverse'
                    }}>
                        {!this.props.isAuth ? (<div style={{display: 'flex'}}>
                                <li style={{marginRight: 15, color: '#007fff', fontSize: 16}}>
                                    <a href="javascript:void(0)" style={{textDecoration: 'none'}}
                                       onClick={() => this.showCalanModel()}>登录</a>
                                </li>
                                <li style={{marginRight: 15, color: '#007fff', fontSize: 16}}>
                                    <a href="javascript:void(0)" style={{textDecoration: 'none'}}
                                       onClick={() => this.showCalanModelregister()}>注册</a>
                                </li>
                            </div>) :
                            <Dropdown overlay={menu} placement="bottomRight">
                                <img style={{width: 40, height: 40, borderRadius: '50%', marginRight: 10}}
                                     src={'/' + this.props.avatar} alt=""/>
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