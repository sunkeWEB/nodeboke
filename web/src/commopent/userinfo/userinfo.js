import React from 'react';
import {message} from 'antd';
import axios from 'axios';

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: '',
            name: '',
            job: '',
            desc: ''
        };
    }

    componentWillMount() {
        axios.get('/users/getroot').then(res => {
            const data = res.data.data;
            if (res.status === 200 && res.data.code === 0) {
                this.setState({
                    avatar: data.avatar,
                    name: data.name,
                    job: data.job,
                    desc: data.desc
                });
            } else {
                message.warning(data.msg);
            }
        });
    }

    render() {
        return (
            <div style={{padding: 15, textAlign: 'center',color:'#999'}}>
                <img src={"/"+this.state.avatar} alt="头像" style={{width: 65, height: 65, borderRadius: '50%',marginBottom:10}}/>
                {this.state.name ? (<div style={{marginBottom:5}}><span>姓名 </span>{this.state.name}</div>) : null}
                {this.state.job ? (<div style={{marginBottom:5}}><span>职业 </span>{this.state.job}</div>) : null}
                {this.state.desc ? (<div  style={{marginBottom:5}}>{this.state.desc}</div>) : null}
            </div>
        )
    }
}

export default UserInfo;