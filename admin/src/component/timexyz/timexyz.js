import React from 'react';
import {Table, Icon, Popconfirm, Button, Modal, DatePicker, Input, message} from 'antd';
// 推荐在入口文件全局设置 locale
import moment from 'moment';

import axios from 'axios';

// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn';

import {formatDate} from './../../until';

moment.locale('zh-cn');
message.config({
    top: 70
});
class Timexyz extends React.Component {
    constructor(props) {
        super(props);
        this.handleCancel = this.handleCancel.bind(this);
        this.onChange = this.onChange.bind(this);
        this.submitSe = this.submitSe.bind(this);
        this.state = {
            confirmLoading: false,
            time: '',
            sj: '',
            modalshow: false,
            modaltitle: "添加事件",
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
        this.setState({
            confirmLoading: true
        });
        const time = this.state.time ? this.state.time : moment().format('L').replace(/\//g, "-");  // 这里用到了 replace  因为数据库是2018-01-18  统一格式
        const sj = this.state.sj;
        axios.post('/addTimexz', {time, sj}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                message.success(res.data.msg);
                this.loadData();
            } else {
                message.success(res.data.msg);
            }
            this.setState({
                sj: '',
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
        axios.get('/getTimexz').then(res => {
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

    render() {
        let columns = [
            {
                title: '时间',
                dataIndex: 'time',
                width: '30%'
            },
            {
                title: '事件',
                dataIndex: 'sj',
                width: '40%',
            },
            {
                title: '创建时间',
                dataIndex: 'create',
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
        const localeoption = {
            "placeholder": "选择日期",
            "today": "选择今天",
            "yearFormat": "YYYY",
        };
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
                        <DatePicker className="marginBottom" onChange={this.onChange} locale={{lang: localeoption}}
                                    style={{width: '100%'}} showToday={false}
                                    defaultValue={moment(moment().format('L'), 'YYYY-MM-DD')}/>
                        <Input onChange={(e) => this.setState({sj: e.target.value})} placeholder="简短的描述一下呗"/>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Timexyz;