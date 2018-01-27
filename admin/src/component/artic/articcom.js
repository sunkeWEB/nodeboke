import React from 'react';
import {
    Form, Select, Switch, Button, Upload, Icon, Input, message
} from 'antd';
import axios from 'axios';
import Selects from './../select/select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

const FormItem = Form.Item;
const Option = Select.Option;
message.config({
    top: 70
});

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.handleBody = this.handleBody.bind(this);
        this.state = {
            disabled: false,
            title: '',
            sort: false,
            body: '',
            fmimg: '',
            dtype: ''
        };
    }

    submitServer() {
        const state = this.state;
        if (state.title === '' || state.body === '' || state.dtype === '' || state.fmimg === '') {
            message.destroy();
            message.warning("必要填写东西必须填写");
            return false;
        }
        axios.post('/addArtice', {...this.state}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                this.setState({
                    disabled: false,
                    title: '',
                    sort: false,
                    body: '',
                    fmimg: '',
                    dtype: ''
                });
                message.success(res.data.msg);
            } else {
                message.error(res.data.msg);
            }
        });
    }

    upload(e) {
        if (e.file.status === 'done') {
            this.setState({
                disabled: true,
                fmimg: e.file.response.path
            });
        }
    }

    removeDisabled() {
        this.setState({
            disabled: false
        });
    }

    handleSubmit(key, value) {
        this.setState({
            [key]: value
        })
    }

    handleBody(e) {
        this.setState({
            body: e
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };
        const modules = {
            toolbar: [
                [{'font': []}, {'header': [1, 2, false]}, {'list': 'ordered'}, {'align': []}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}, 'bold', 'italic', 'underline', 'strike', 'blockquote', 'code', {'color': []}, {'background': []}, 'link', 'image', 'clean'],
            ],
        };
        const formats = [
            'font', 'header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'align', 'color', 'background', 'link', 'image', 'code', 'clean'
        ];
        return (
            <div>
                <Button onClick={() => this.props.history.go(-1)}>
                    <Icon type="left"/>Back
                </Button>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        label="标题"
                        {...formItemLayout}
                    >
                        <Input placeholder="文章标题" onChange={(e) => this.handleSubmit('title', e.target.value)}/>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="类型"
                        hasFeedback
                    >
                        <Selects handlesubmit={(e) => this.handleSubmit('dtype', e)}/>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="是否推荐"
                    >
                        {getFieldDecorator('switch', {valuePropName: 'checked'})(
                            <Switch onChange={(e) => this.handleSubmit('sort', e)}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="文章封面"
                    >
                        <Upload name="logo" action="/upload" listType="picture" onChange={(e) => this.upload(e)}
                                disabled={this.state.disabled}
                                onRemove={() => this.removeDisabled()}
                        >
                            <Button>
                                <Icon type="upload"/> 上传封面
                            </Button>
                        </Upload>
                    </FormItem>
                    <FormItem {...formItemLayout} label="文章内容">
                        <ReactQuill value={this.state.body}
                                    onChange={this.handleBody}
                                    modules={modules}
                                    formats={formats}
                        />
                    </FormItem>
                    <FormItem
                        wrapperCol={{span: 14, offset: 6}}
                    >
                        <Button type="primary" onClick={() => this.submitServer()}>提交</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

const ArticCom = Form.create()(Demo);
export default ArticCom;