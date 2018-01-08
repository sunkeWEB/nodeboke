import React from 'react';
import {Table, Icon, Popconfirm, Button, Modal, Input, message, Upload, Switch} from 'antd';
import {formatDate} from "../../until";
import axios from 'axios';

class Calcan extends React.Component {
    constructor(props) {
        super(props);
        this.handleCancel = this.handleCancel.bind(this);
        this.onChange = this.onChange.bind(this);
        this.submitSe = this.submitSe.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            confirmLoading: false,
            calcanavatar: '',
            js: '',
            modalshow: false,
            modaltitle: "添加事件",
            okText: "添加",
            calText: "取消",
            loading: true,
            pagination: true,
            data: [],
            editId: '',
            fileList: []
        };
    }

    handleCancel() {
        this.setState({
            modalshow: false,
        });
    }

    onChange(date, dateString) {
        this.setState({
            time: dateString
        });
    }

    handleChange({fileList}) {
        let k = false;
        if (fileList.length >= 1 && fileList[0].response) {
            console.log(fileList[0].response.path);
            this.setState({calcanavatar: fileList[0].response.path});
            k = true;
        }
        this.setState({showUploadBtn: k, fileList})
    }

    submitSe() {
        this.setState({
            confirmLoading: true
        });
        const {js, calcanavatar} = this.state;
        axios.post('/addcalcan', {calcanavatar, js}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                message.success(res.data.msg);
                // this.loadData();
            } else {
                message.success(res.data.msg);
            }
            this.setState({
                js: '',
                confirmLoading: false,
                modalshow: false
            });
        });
    }

    del(id) {
        axios.post('/deltimexz', {id}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                message.warn(res.data.msg);
                this.loadData();
            } else {
                message.warn(res.data.msg);
            }
        });
    }

    componentWillMount() {
        this.loadData();
    }

    loadData() {
        axios.get('/getCalcan').then(res => {
            if (res.status === 200 && res.data.code === 0) {
                this.setState({
                    data: res.data.data
                });
            } else {

            }
            this.setState({
                loading: false
            });
        });
    }

    chageswitch (e,id) {
        axios.post('/updatecalcan',{
            id
        }).then(res=>{
            if (res.status ===200 && res.data.code===0) {
                this.loadData();
            }else{
                message.warn("数据更新失败");
            }
        });
    }

    render() {
        const url = "http://127.0.0.1:9093/";
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">点击上传</div>
            </div>
        );
        let columns = [
            {
                title: '缩略图',
                dataIndex: 'imgurl',
                width: '60px',
                render: (value, record) => {
                    return <img style={{width: 50, height: 50}} src={`${url}${value}`}/>
                }
            },
            {
                title: '描述',
                dataIndex: 'js',
                width: '40%',
            },
            {
                title: '创建时间',
                dataIndex: 'time',
                width: '20%',
                render: (value) => {
                    return formatDate(value);
                }
            },
            {
                title: '状态',
                dataIndex: 'status',
                width: '20%',
                render: (value, record) => {
                    const id = record._id;
                    return (<div><Switch onChange={(e,id) =>this.chageswitch(e,id)} checkedChildren="使用中" unCheckedChildren="已暂停" defaultChecked={value}/></div>)
                }
            },
            {
                title: '操作',
                width: '20%',
                render: (value, record) => {
                    return (<div>
                        <Popconfirm placement="topLeft" title="你确定删除嘛?" onConfirm={() => this.del(record._id)}
                                    okText="果断删除"
                                    cancelText="取消">
                            <Icon type="delete" style={{marginRight: 10}}/>
                        </Popconfirm>
                    </div>)
                }
            }
        ];
        return (
            <div>
                <Button type="primary" onClick={() => this.setState({modalshow: true})}
                        className="marginBottom">添加</Button>
                <Table
                    columns={columns}
                    rowKey={record => Math.random()}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    scroll={{x: true}}
                    size={"small"}
                    loading={this.state.loading}
                    bordered={true}
                    locale={{emptyText: '暂无数据'}}
                >
                </Table>
                <Modal title={this.state.modaltitle}
                       visible={this.state.modalshow}
                       onOk={this.submitSe}
                       okText={this.state.okText}
                       cancelText={this.state.calText}
                       confirmLoading={this.state.confirmLoading}
                       onCancel={this.handleCancel}
                >
                    <div>
                        <Upload
                            name="logo"
                            action="/upload"
                            listType="picture-card"
                            fileList={this.state.fileList}
                            onChange={this.handleChange}
                        >
                            {this.state.showUploadBtn ? null : uploadButton}
                        </Upload>
                        <Input onChange={(e) => this.setState({js: e.target.value})} placeholder="简短的描述一下呗"/>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Calcan;