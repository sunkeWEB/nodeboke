import React from 'react';
import UploadImg from './../upload/uploads';
import {Input, Button, message} from 'antd';
import {connect} from 'react-redux';
import axios from 'axios';
import {LoadDate} from './../../reducer/user.redux';

@connect(state => state.users, {LoadDate})
class Profiles extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            useravatar: '',
            name: ''
        };
    }

    componentWillMount() {
        this.setState({
            useravatar: this.props.avatar,
            name: this.props.name
        });
    }

    handleupload(e, k) {
        if (e.length >= 1 && e[0].response) {
            this.setState({
                [k]: e[0].response.path
            });
        } else {
            this.setState({
                [k]: ''
            });
        }
    }

    handleSubmit() {
        axios.post('/users/updateuser', {...this.state}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                console.log(res);
                this.props.LoadDate({name:res.data.data.name,phone:res.data.data.phone,avatar:res.data.data.avatar});
                message.success("数据同步成功");
            } else {
                message.warning("数据同步失败");
            }
        });
    }

    render() {
        return (
            <div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{width: 100}}>头像</div>
                    <div>
                        <UploadImg handleUploads={(e) => this.handleupload(e, 'useravatar')}
                                   showBtnUpdate={this.state.useravatar}/>
                    </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{width: 100}}>昵称</div>
                    <div style={{flex: 1, marginBottom: 15}}>
                        <Input value={this.state.name} onChange={(e) => this.setState({name: e.target.value})}
                               placeholder="填写你的昵称" style={{width: '100%'}}/>
                    </div>
                </div>
                <div style={{textAlign: 'right'}}>
                    <Button id="savebtn" type="primary" onClick={() => this.handleSubmit()}>保存</Button>
                </div>
            </div>
        )
    }
}

export default Profiles;