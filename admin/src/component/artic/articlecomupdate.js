import React from 'react';
import {
    Form, Select, Switch, Button, Upload, Icon, Input, message
} from 'antd';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const FormItem = Form.Item;

const Option = Select.Option;

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.handleBody = this.handleBody.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            title: '',
            sort: false,
            body: '',
            fmimg: '',
            dtype: '',
            defaultFileList: [{}],
            showUploadBtn: true
        };
    }
    submitServer() {
        const state = this.state;
        if (state.title === '' || state.body === '' || state.dtype === '' || state.fmimg === '') {
            message.destroy();
            message.warning("必要填写东西必须填写");
            return false;
        }
        axios.post('/updateAritic', {id: this.props.match.params.id,...this.state}).then(res => {
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
                // this.props.history.push('/');
            } else {
                message.error(res.data.msg);
            }
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

    componentWillMount() {
        axios.get('/infoAritic', {
            params: {
                id: this.props.match.params.id
            }
        }).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                let data = res.data.data[0];
                this.setState({
                    disabled: false,
                    title: data.title,
                    sort: data.sort,
                    body: data.body,
                    fmimg: data.fmimg,
                    dtype: data.dtype,
                    fileList: [{
                        uid: -1,
                        name: 'xxx.png',
                        status: 'done',
                        url: `http://localhost:9093/${data.fmimg}`,
                    }]
                });
            }
            else {
                message.warning("数据加载失败");
            }
        });
    }


    handleChange({fileList}) {
        let k = false;
        if (fileList.length >= 1 && fileList[0].response) {
            this.setState({fmimg: fileList[0].response.path});
            k = true;
        }
        this.setState({showUploadBtn: k, fileList})
    }

    render() {
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };
        const modules = {
            toolbar: [
                // [{ 'font': [] }],
                [{'header': [1, 2, false]}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                // [{ 'align': [] }],
                // [{ 'color': [] }, { 'background': [] }],
                ['link', 'image'],
                ['clean']
            ],
        };
        const formats = [
            'header',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image'
        ];
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
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
                        <Input placeholder="文章标题" onChange={(e) => this.handleSubmit('title', e.target.value)}
                               value={this.state.title}/>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="类型"
                        hasFeedback
                    >
                        <Select placeholder="文章类型" onChange={(e) => this.handleSubmit('dtype', e)}
                                value={this.state.dtype}>
                            <Option value="html/css" key="html">html/css</Option>
                            <Option value="React" key="React">Reactjs</Option>
                            <Option value="Vue" key="Vue">Vuejs</Option>
                            <Option value="nodejs" key="nodejs">nodejs</Option>
                            <Option value="php" key="php">php</Option>
                        </Select>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="是否置顶"
                    >
                        <Switch onChange={(e) => this.handleSubmit('sort', e)} checked={this.state.sort}/>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="文章封面"
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
                        <Button type="primary" onClick={() => this.submitServer()}>修改</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
const ArticCom = Form.create()(Demo);
export default ArticCom;