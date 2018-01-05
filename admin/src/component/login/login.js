import React, {Component} from 'react';
import {Input, Col, Row, Icon, Button} from 'antd';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import logosrc from './logo.jpg';
import {Logins} from "./../../reducer/user.redux";

@connect(state => state.user, {
    Logins
})
class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        // this.errMsg = this.errMsg.bind(this);
        this.state = {
            loginStatus: false,
            pwd: '',
            user: ''
        };
    }

    handleChange(key, e) {
        this.setState({
            [key]: e.target.value
        });
    }


    login() {
        this.setState({
            loginStatus: true
        });
        this.props.Logins({...this.state});
        // setTimeout(() => {
        //     this.setState({
        //         loginStatus: false
        //     });
        //     if (this.props.msg) {
        //         message.error(this.props.msg);
        //     }
        // }, 1888);
    }

    render() {
        const inputMargin = {
            marginTop: 5
        };
        return (
            <div style={{padding: 20, paddingTop: 100}}>
                {this.props.user ? <Redirect to="/app" /> : null}
                <Row type="flex" justify="center">
                    <Col xs={24} sm={24} md={8} xl={5} lg={10}>
                        <div>
                            <div style={{textAlign: "center", margin: 15}}>
                                <img className="loginimg" src={logosrc} alt=""/>
                            </div>
                            <div>
                                <Input
                                    placeholder="用户名"
                                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.65)'}}/>}
                                    style={inputMargin}
                                    value={this.state.user}
                                    onChange={(v) => this.handleChange('user', v)}
                                />
                                <Input
                                    style={inputMargin}
                                    placeholder="密码"
                                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.65)'}}/>}
                                    type="password"
                                    value={this.state.pwd}
                                    onChange={(v) => this.handleChange('pwd', v)}
                                />
                                <div>
                                    <Button type="primary" style={{marginTop: 15}} className="loginBtn"
                                            onClick={this.login} loading={this.state.loginStatus}>登录</Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Login;