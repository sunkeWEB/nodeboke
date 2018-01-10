import React from 'react';
import {Table, Button, message, Icon, Popconfirm} from 'antd';
import axios from 'axios';
import {formatDate} from './../../until';
import QueueAnim from 'rc-queue-anim';
message.config({
    top: 70
});

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            pagination: true,
            data: [],
            editId:''
        };
    }

    componentWillMount() {
        this.loadData();
    }

    loadData () {
        axios.get('/infoAritic').then(res => {
            if (res.status !== 200 || res.data.code !== 0) {
                message.warning("数据获取失败");
            }
            this.setState({
                data: res.data.data,
                loading: false
            });
        });
    }
    handleProps (id) {
        this.props.history.push(`/articleupdate/${id}`);
    }

    del (id) {
        axios.post('/delArtics',{ariticId:id}).then(res=>{
            if (res.status===200&& res.data.code===0) {
                this.loadData();
            }
        });
    };
    render() {
        let columns = [
            {
                title: '作者',
                dataIndex: 'author',
                width: '20%'
            },
            {
                title: '标题',
                dataIndex: 'title',
                width: '20%',
            },
            {
                title: '类型',
                dataIndex: "dtype",
                width: '80px'
            },
            {
                title:"点赞数",
                dataIndex: "dianzan",
                width:'80px',
                render:(value)=>{
                    return value.length
                }
            },
            {
                title:"评论数",
                dataIndex: "comment",
                width:'80px',
                render:(value)=>{
                    return value.length
                }
            },
            {
                title: '添加时间',
                dataIndex: 'time',
                width: '80px',
                render:(value) => {
                    return formatDate(value);
                }
            },
            {
                title: '操作',
                width: '80px',
                render: (value,record) => {
                    return  (<div>
                        <Popconfirm placement="topLeft" title="你确定删除嘛?" onConfirm={()=>this.del(record._id)} okText="果断删除"
                                    cancelText="取消">
                            <Icon type="delete" style={{marginRight:10}} />
                        </Popconfirm>
                        <Icon type="edit" onClick={()=>this.handleProps(record._id)} />
                    </div>)
                }
            }
        ];
        return (
            <div>
                <Button type="primary" style={{marginBottom: 10}}
                        onClick={() => this.props.history.push('/articleadd')} >添加</Button>
                <QueueAnim delay={300} className="queue-simple">
                    <Table columns={columns}
                           rowKey={record => Math.random()}
                           dataSource={this.state.data}
                           pagination={this.state.pagination}
                           scroll={{x: true}}
                           size={"small"}
                           loading={this.state.loading}
                           bordered={true}
                           locale={{emptyText:'暂无数据'}}
                    />
                </QueueAnim>
            </div>
        )
    }
}

export default Article;