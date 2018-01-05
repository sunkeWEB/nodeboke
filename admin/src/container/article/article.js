import React from 'react';
import {Table, Button, message, Icon, Popconfirm} from 'antd';
import axios from 'axios';
import {formatDate} from './../../until';

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            pagination: true,
            data: [],
        };
    }

    componentWillMount() {
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

    del() {
        alert("1534152");
    }

    render() {
        const columns = [
            {
                title: '作者',
                dataIndex: 'author',
                width: '20%'
            }, {
                title: '标题',
                dataIndex: 'title',
                // render: name => `${name.first} ${name.last}`,
                width: '20%',
            },
            {
                title: '类型',
                dataIndex: "dtype",
                width: '20%'
            },
            {
                title: '最后一次操作时间',
                dataIndex: 'time',
                width: '20%',
                render(value, record, index) {
                    return formatDate(value);
                }
            }, {
                title: '操作',
                width: '20%',
                render() {
                    return <div>
                        <Icon type="delete" style={{marginRight: 10}} onClick={() => this.del()} />
                        <Icon type="edit" />
                    </div>
                }
            }
        ];
        return (
            <div>
                <Button type="primary" style={{marginBottom: 10}}
                        onClick={() => this.props.history.push('/articleadd')}>添加</Button>
                <Table columns={columns}
                       rowKey={record => Math.random()}
                       dataSource={this.state.data}
                       pagination={this.state.pagination}
                       scroll={{x: true}}
                       size={"small"}
                       loading={this.state.loading}
                       bordered={true}
                    // loading={this.state.loading}
                    // onChange={this.handleTableChange}
                />
            </div>
        )
    }
}

export default Article;