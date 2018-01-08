import React from 'react';
import {
    Input,
    Form, Select, Button, Upload, Icon, message
} from 'antd';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {loadDate} from './../../reducer/user.redux';
const FormItem = Form.Item;
const Option = Select.Option;
@withRouter
@connect(state => state, {loadDate})
class Userinfo extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            disabled: false,
            showUploadBtn: true,
            name: '',
            desc: '',
            avatar: '',
            sex: '',
            job: '',
            fileList: []
        };
    }

    handleSubmit(key, value) {
        this.setState({
            [key]: value
        });
    }

    handleChange({fileList}) {
        let k = false;
        if (fileList.length >= 1 && fileList[0].response) {
            console.log(fileList[0].response.path);
            this.setState({avatar: fileList[0].response.path});
            k = true;
        }
        this.setState({showUploadBtn: k, fileList})
    }

    submitServer() {
        const {fileList, disabled, showUploadBtn, ...data} = this.state;
        axios.post('/users/addxx', {...data}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                message.success(res.data.msg);
                this.loadDate("avatarupdate");
            }
            message.success(res.data.msg);
        });
    }

    componentWillMount () {
        this.loadDate();
    }
    loadDate (type="read") {
        axios.get('/users/info').then((res) => {
            if (res.status === 200) {
                if (res.data.code === 0) {
                    let data = res.data.data;
                    this.setState({
                        showUploadBtn: true,
                        name: data.name,
                        desc: data.desc,
                        avatar: data.avatar,
                        sex: data.sex,
                        job: data.job,
                        fileList: [{
                            uid: -1,
                            name: 'xxx.png',
                            status: 'done',
                            url: `http://localhost:9093/${data.avatar}`,
                        }]
                    });
                    if (type==='avatarupdate') {
                        this.props.loadDate(res.data.data);
                    }
                } else {
                    // 没有登录信息
                    this.props.history.push('/login');
                }
            }
        })
    }

    render() {
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">点击上传</div>
            </div>
        );
        return (
            <div>
                <Button onClick={() => this.props.history.go(-1)}>
                    <Icon type="left"/>Back
                </Button>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        label="姓名"
                        {...formItemLayout}
                    >
                        <Input value={this.state.name ? this.state.name : ''} placeholder="请输入你的姓名"
                               onChange={(e) => this.handleSubmit('name', e.target.value)}/>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="性别"
                    >
                        <Select value={this.state.sex ? this.state.sex : ''} placeholder="请输入你的性别"
                                onChange={(e) => this.handleSubmit('sex', e)}>
                            <Option value="男" key="男" selected>男</Option>
                            <Option value="女" key="女">女</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="职业/其他"
                    >
                        <Input value={this.state.job ? this.state.job : ''} placeholder="输入你的职业/其他"
                               onChange={(e) => this.handleSubmit('job', e.target.value)}/>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="你的头像"
                    >
                        <Upload
                            name="logo"
                            action="/upload"
                            listType="picture-card"
                            fileList={this.state.fileList}
                            onChange={this.handleChange}
                        >
                            {this.state.showUploadBtn ? null : uploadButton}
                        </Upload>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="个人简介"
                    >
                        <Input value={this.state.desc ? this.state.desc : ''} type="textarea" placeholder="简短的介绍自己吧"
                               autosize={{minRows: 2, maxRows: 6}}
                               onChange={(e) => this.handleSubmit('desc', e.target.value)}/>

                    </FormItem>
                    <FormItem
                        wrapperCol={{span: 14, offset: 6}}
                    >
                        <Button type="primary" onClick={() => this.submitServer()}>提交/修改</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default Userinfo;