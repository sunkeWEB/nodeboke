import React from 'react';
import {Input, Button,message} from 'antd';
import axios from 'axios';

class UpdatePwd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldpwd:'',
            newpwd:'',
            renewpwd:''
        };
    }

    // updateuserpwd

    handleInput (k,v) {
        this.setState({
            [k]:v.target.value
        });
    }

    updatepwdsubmit () {
        if (this.state.newpwd === '' || this.state.renewpwd === '' || this.state.newpwd==='') {
            message.warning("数据必须填写");
            return false;
        }
        if (this.state.newpwd !== this.state.renewpwd) {
            message.warning("新密码和确认密码不相等");
            return false;
        }
        axios.post('/users/updateuserpwd',{...this.state}).then(res=>{
            if (res.data.code===0 && res.status===200) {
                message.success(res.data.msg);
                this.props.history.push('/');
            }else {
                message.success(res.data.msg);
            }
        })
    }

    render() {
        return (
            <div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{width: 100}}>旧密码</div>
                    <div style={{flex: 1, margin: '10px 0'}}>
                        <Input type="password" placeholder="请输入原密码" style={{width: '100%'}} onChange={(e)=>this.handleInput('oldpwd',e)} />
                    </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{width: 100}}>新密码</div>
                    <div style={{flex: 1, margin: '10px 0'}}>
                        <Input type="password" placeholder="请输入新密码" style={{width: '100%'}} onChange={(e)=>this.handleInput('newpwd',e)} />
                    </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{width: 100}}>确认新密码</div>
                    <div style={{flex: 1, margin: '10px 0'}}>
                        <Input type="password" placeholder="确认新密码" style={{width: '100%'}} onChange={(e)=>this.handleInput('renewpwd',e)} />
                    </div>
                </div>
                <div style={{textAlign: 'right'}}>
                    <Button id="savebtn" type="primary" onClick={()=>this.updatepwdsubmit()} >修改</Button>
                </div>
            </div>
        )
    }
}

export default UpdatePwd;