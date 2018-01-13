import React from 'react';
import {Modal, Button, Input, message} from 'antd';
import Pwd from './../img/pwd.png';
import NoPwdName from './../img/nopwdname.png';
import Name from './../img/name.png';
import axios from 'axios';
import {connect} from 'react-redux';
import {LoadDate} from './../../reducer/user.redux';

@connect(state => state.users, {
    LoadDate
})
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showimg: NoPwdName,
            top: -90,
            name: '',
            pwd: ''
        };
    }

    login() {
        message.destroy();
        const {name, pwd} = {...this.state};
        if (name === '') {
            message.warn("用户名不能为空");
            return false;
        } else if (pwd === '') {
            message.warn("密码不能为空");
            return false;
        }
        axios.post('/users/loginuser', {name, pwd}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                const {name,phone,avatar} = res.data.data;
                this.props.loginsuccess();
                this.props.LoadDate({name,phone,avatar});
            } else {
                message.warn(res.data.msg);
            }
        });
    }

    handleCancel() {
        this.props.closemodel();
    }

    InputFocus(e) {
        if (e === 'name') {
            this.setState({
                showimg: Name,
                top: -108
            });
        } else if (e === 'pwd') {
            this.setState({
                showimg: Pwd,
                top: -90
            });
        }
    }

    InputBlur() {
        this.setState({
            showimg: NoPwdName,
            top: -90
        });
    }

    handleInput(k, v) {
        this.setState({
            [k]: v
        });
    }

    render() {
        return (
            <div>
                {this.props.visible ? (<div>
                    <Modal
                        title="登录"
                        visible={this.props.visible}
                        onOk={this.handleOk}
                        onCancel={() => this.handleCancel()}
                        footer={null}
                        width={350}
                        style={{top: '15rem'}}
                    >
                        <div style={{position: 'absolute', top: this.state.top, left: 95}}>
                            <img style={{width: 150}} src={this.state.showimg} alt=""/>
                        </div>
                        <Input placeholder="请输入用户名" style={{marginBottom: 12}} onFocus={() => this.InputFocus('name')}
                               onBlur={() => this.InputBlur}
                               onChange={(e) => this.handleInput('name', e.target.value)}
                        />
                        <Input type="password" placeholder="请输入用户名密码" style={{marginBottom: 12}}
                               onFocus={() => this.InputFocus('pwd')} onBlur={() => this.InputBlur('pwd')}
                               onChange={(e) => this.handleInput('pwd', e.target.value)}
                        />
                        <Button type="primary" style={{width: "100%"}} onClick={() => this.login()}>登录</Button>
                        <div style={{display: 'flex', padding: '10px 0'}}>
                            <div>
                                <span>没有账号 ?</span> <a href="javascript:void(0)"
                                                       onClick={() => this.props.openOtherModal('showRegisterModel')}>注册</a>
                            </div>
                            <div style={{flex: 1, textAlign: 'right'}}>
                                <a href="javascript:void(0)">忘记密码</a>
                            </div>
                        </div>
                    </Modal>
                </div>) : null}
            </div>
        )
    }
}

export default Login;