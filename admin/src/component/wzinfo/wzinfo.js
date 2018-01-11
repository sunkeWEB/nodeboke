import React from 'react';
import {Button, Input, Switch,message} from 'antd';
import UploadImg from './../upload/uploads';
import axios from 'axios';

class WzInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logo: '',
            weixin: '',
            qq: '',
            wzbeiannum: '',
            wzname: '',
            showsk: true,
            id:''
        };
    }

    componentWillMount () {
        axios.get('/getwzxx').then(res=>{
            if (res.status === 200 && res.data.code===0 && res.data.data.length>0) {
                const data = res.data.data[0];
                this.setState({
                    logo: data.logo,
                    weixin: data.weixin,
                    qq: data.qq,
                    wzbeiannum: data.wzbeiannum,
                    wzname: data.wzname,
                    showsk: data.showsk,
                    id:data._id
                });
            }else {
                message.warning(res.data.msg);
            }
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

    handleInput(e,key) {
        this.setState({
            [key]: e
        });
    }

    submitServer() {
        axios.post('/wzxx', {...this.state}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                message.success("数据同步成功");
            }else{
                message.warning("数据失败");
            }
        });
    }

    render() {
        //  这里 UploadImg 接收两个参数  一个是图片上传之后的返回的地址  一个是原先就存在的地址
        return (
            <div>
                <div>
                    <div style={{display: 'flex'}}>
                        <p style={{width: 100}}>博主介绍</p>
                        <Switch checkedChildren="开启" unCheckedChildren="关闭"
                                onChange={(e) => this.handleInput('sort', e)} checked={this.state.showsk}/>
                    </div>
                    <div style={{display: 'flex'}} className="marginBottom">
                        <p style={{width: 100}}>网站名称</p>
                        <Input value={this.state.wzname} placeholder="请输入网站名称" onChange={(e) => this.handleInput(e.target.value, 'wzname')}/>
                    </div>
                    <div style={{display: 'flex'}} className="marginBottom">
                        <p style={{width: 100}}>备案号</p>
                        <Input value={this.state.wzbeiannum} placeholder="请输入网站备案号" onChange={(e) => this.handleInput(e.target.value, 'wzbeiannum')}/>
                    </div>
                </div>
                <div className="uploadGroup marginBottom">
                    <div style={{}}>
                        <p>网站Logo</p>
                        <UploadImg handleUploads={(e) => this.handleupload(e, 'logo')} showBtnUpdate={this.state.logo}/>
                    </div>
                    <div style={{}}>
                        <p>微信/群二维码</p>
                        <UploadImg handleUploads={(e) => this.handleupload(e, 'weixin')}
                                   showBtnUpdate={this.state.weixin}/>
                    </div>
                    <div style={{}}>
                        <p>QQ/群二维码</p>
                        <UploadImg handleUploads={(e) => this.handleupload(e, 'qq')} showBtnUpdate={this.state.qq}/>
                    </div>
                </div>
                <Button className="uploadGroup" onClick={() => this.submitServer()} type="primary">保存</Button>
            </div>
        );
    }
}

export default WzInfo;