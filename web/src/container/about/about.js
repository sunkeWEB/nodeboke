import React from 'react';
import axios from 'axios';
import {Timeline,message} from 'antd';
const Item = Timeline.Item;
class Timexz extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            data:[]
        };
    }
    componentWillMount () {
        axios.get('/gettimexz').then(res=>{
            if (res.data.code===1) {
                message.warning("数据获取失败");
                return false;
            }
            this.setState({
                data:res.data.data
            });
        });
    }
    render() {
        return (
            <div style={{paddingTop: 80}} className="sk-body">
                <div className="sk-body-left">
                    <Timeline  pending="向着明天的太阳走...">
                        {this.state.data.map(v=>
                            <Item key={v.sj}><span>{v.sj}</span> <span>{v.time}</span></Item>
                        )}
                    </Timeline>
                </div>
            </div>
        )
    }
}

export default Timexz;