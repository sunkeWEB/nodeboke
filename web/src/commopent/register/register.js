import React from 'react';
import {Modal, Button, Input, message} from 'antd';
import axios from 'axios';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            pwd: '',
            emailphone: '',
            loading: false
        };
    }

    handleOk() {
        const data = this.state;
        message.destroy();
        if (data.name === '') {
            message.warning("用户名不能为空");
            return false;
        }else if (data.emailphone === '') {
            message.warning("电话或邮箱不能为空");
            return false;
        }else if (data.pwd) {
            message.warning("密码不能为空");
            return false;
        }
        this.setState({
            loading: true
        });
        axios.post('/users/adduser', {...this.state}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                message.success(res.data.msg);
            } else {
                message.warning(res.data.msg);
            }
        });
        this.setState({
            loading: false
        });
    }

    handleCancel() {
        this.props.closemodel();
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
                        title="注册"
                        visible={this.props.visible}
                        onCancel={() => this.handleCancel()}
                        footer={null}
                        width={350}
                        style={{top: '15rem'}}
                    >
                        <Input placeholder="请输入用户名" style={{marginBottom: 12}}
                               onChange={(e) => this.handleInput('name', e.target.value)}/>
                        <Input type="email" placeholder="请输入手机或邮箱" style={{marginBottom: 12}}
                               onChange={(e) => this.handleInput('emailphone', e.target.value)}/>
                        <Input type="password" placeholder="请输入用户名密码" style={{marginBottom: 12}}
                               onChange={(e) => this.handleInput('pwd', e.target.value)}/>
                        <Button loading={this.state.loading} type="primary" style={{width: "100%"}}
                                onClick={() => this.handleOk()}>注册</Button>
                        <div style={{display: 'flex', padding: '10px 0'}}>
                            <div style={{flex: 1, textAlign: 'center'}}>
                                <a href="javascript:void(0)"
                                   onClick={() => this.props.openOtherModal('showLoginModel')}>已有账号登录</a>
                            </div>
                        </div>
                    </Modal>
                </div>) : null}
            </div>
        )
    }
}

export default Register;