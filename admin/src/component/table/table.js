import React from 'react';

class ComTable extends React.Component {
    render() {
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
                       locale={{emptyText: '暂无数据'}}
                />
            </div>
        )
    }
}

export default ComTable;