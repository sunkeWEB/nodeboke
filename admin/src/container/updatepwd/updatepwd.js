import React from 'react';
import {Input, Button, Row, Col, Icon, message} from 'antd';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {UpdatePwds, clearMsg} from './../../reducer/user.redux';
import browserCookies from 'browser-cookies';

@connect(state => state.user, {
    UpdatePwds, clearMsg
})
class UpdatePwd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldpwd: '',
            newpwd: '',
            renewpwd: ''
        };
    }

    handleChange(key, e) {
        this.setState({
            [key]: e.target.value
        });
    }

    updateSubmit() {
        this.props.UpdatePwds({...this.state})
    }

    lougout() {
        setTimeout(() => {
            message.info('密码修改成功 请重新登录');
            browserCookies.erase('userid');
        }, 1000);
        return <Redirect to={this.props.redicertTo}/>
    }


    // showMsg() {
    //     message.destroy();
    //     message.warning(this.props.msg);
    //     this.props.clearMsg('');
    // }

    render() {
        return (
            <div>
                {this.props.redicertTo && this.props.redicertTo === '/login' ?
                    this.lougout() : null}
                <Row>
                    <Col xs={24} sm={24} md={24} lg={8} xl={10}>
                        <Input placeholder="原密码" className="marginBottom"
                               prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.65)'}}/>}
                               onChange={(v) => this.handleChange('oldpwd', v)}
                        />
                        <Input placeholder="新密码" className="marginBottom"
                               prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.65)'}}/>}
                               onChange={(v) => this.handleChange('newpwd', v)}
                        />
                        <Input placeholder="确认密码" className="marginBottom"
                               prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.65)'}}/>}
                               onChange={(v) => this.handleChange('renewpwd', v)}
                        />
                        <Button type="primary" className="updatepwdbtn" onClick={() => this.updateSubmit()}>修改</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default UpdatePwd;