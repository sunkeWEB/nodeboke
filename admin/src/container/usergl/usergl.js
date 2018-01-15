import React from 'react';
import {Table, Button, message, Icon, Popconfirm} from 'antd';
import axios from 'axios';
import {formatDate} from './../../until';
import QueueAnim from 'rc-queue-anim';
message.config({
    top: 70
});
class UserGl extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            data:[]
        };
    }
    componentWillMount () {
        axios.get('/users/getuserslist').then(res=>{
            console.log(res);
            if (res.data.code===1) {
                message.warning(res.data.code);
                return false;
            }
            this.setState({
                data:res.data.data
            });
        })
    }
    render () {
        let columns = [
            {
                title: '昵称',
                dataIndex: 'name',
                width: '20%'
            },
            {
                title: '邮箱',
                dataIndex: 'mail',
                width: '20%',
            },
            {
                title: '电话',
                dataIndex: "phone",
                width: '80px'
            },
            {
                title: '创建时间',
                dataIndex: 'createtime',
                width: '80px',
                sorter: (a, b) => a.createtime - b.createtime,
                render:(value) => {
                    return formatDate(value);
                }
            },
            {
                title: '最后登陆时间',
                dataIndex: 'lasttime',
                width: '80px',
                sorter: (a, b) => a.lasttime - b.lasttime,
                render:(value) => {
                    if (value) {
                        return formatDate(value);
                    }
                }
            },
            {
                title: '最后登陆ip',
                dataIndex: 'lastip',
                width: '80px'
            },
            {
                title: '操作',
                width: '80px',
                // render: (value,record) => {
                //     return  (<div>
                //         <Popconfirm placement="topLeft" title="你确定删除嘛?" onConfirm={()=>this.del(record._id)} okText="果断删除"
                //                     cancelText="取消">
                //             <Icon type="delete" style={{marginRight:10}} />
                //         </Popconfirm>
                //         <Icon type="edit" onClick={()=>this.handleProps(record._id)} />
                //     </div>)
                // }
            }
        ];
        return (
            <div>
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
            </div>
        )
    }
}

export default UserGl;