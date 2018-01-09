import React from 'react';
import axios from 'axios';
import {Select} from 'antd';

const Option = Select.Option;

class Selects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            value: ''
        };
    }

    componentWillMount() {
        axios.get('/getDtype').then(res => {
            if (res.status === 200 && res.data.code === 0) {
                this.setState({
                    data: res.data.data
                });
            }
        });
    }

    render() {
        return (
            <div>
                {this.props.value ? (
                    <Select value={this.props.value} placeholder="文章类型" onChange={this.props.handlesubmit}>
                        {this.state.data.map(v =>
                            <Option value={v.name} key={v.name}>{v.name}</Option>
                        )}
                    </Select>) : (<Select placeholder="文章类型" onChange={this.props.handlesubmit}>
                    {this.state.data.map(v =>
                        <Option value={v.name} key={v.name}>{v.name}</Option>
                    )}
                </Select>)}
            </div>
        )
    }
}

export default Selects;