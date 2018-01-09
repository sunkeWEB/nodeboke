import React from 'react';
import {Table, Icon, Popconfirm, Button, Modal, Input, message, InputNumber} from 'antd';
import axios from 'axios';
import {formatDate} from './../../until';

message.config({
    top: 70
});

class Arititype extends React.Component {
    constructor(props) {
        super(props);
        this.handleCancel = this.handleCancel.bind(this);
        this.onChange = this.onChange.bind(this);
        this.submitSe = this.submitSe.bind(this);
        this.state = {
            confirmLoading: false,
            name: '',
            js: '',
            sort: '',
            modalshow: false,
            modaltitle: "添加类型",
            okText: "添加",
            calText: "取消",
            loading: true,
            pagination: true,
            data: [],
            editId: ''
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

    submitSe() {
        const {name, js, sort} = {...this.state};
        axios.post('/addtypes', {name, js, sort}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                message.success(res.data.msg);
                this.setState({
                    modalshow:false,
                    js:'',
                    name:'',
                    sort:''
                });
                this.loadData();
            }else{
                message.warn("获取数据失败");
            }
        });
    }

    del(id) {
        axios.post('/deltimexz', {id}).then(res => {
            message.destroy();
            if (res.status === 200 && res.data.code === 0) {
                message.success(res.data.msg);
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
        axios.get('/getDtype').then(res => {
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

    del (id) {
        axios.post('/deldtype',{id}).then(res=>{
            if (res.status === 200 && res.data.code === 0) {
                message.warn(res.data.msg);
                this.loadData();
            } else {
                message.warn(res.data.msg);
            }
        });
    }

    render() {
        let columns = [
            {
                title: '名称',
                dataIndex: 'name',
                width: '30%'
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
                        <Input value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} placeholder="类型名称"
                               className="marginBottom"/>
                        <InputNumber style={{width: '100%'}} placeholder="数字越大  越靠前"
                                     onChange={(e) => this.setState({sort: e})} className="marginBottom"
                                     value={this.state.sort}
                        />
                        <Input onChange={(e) => this.setState({js: e.target.value})} placeholder="简短的描述一下呗" value={this.state.js} />
                    </div>
                </Modal>
            </div>
        )
    }
}


export default Arititype;