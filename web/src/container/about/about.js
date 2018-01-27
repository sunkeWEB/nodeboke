import React from 'react';
// import Loading from './../../commopent/load/load.js';
import axios from 'axios';
import {Timeline, message} from 'antd';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'
import QueueAnim from 'rc-queue-anim';

const Item = Timeline.Item;

class Timexz extends React.Component {
    constructor(props) {
        super(props);
        this.formatterTime = this.formatterTime.bind(this);
        this.state = {
            data: []
        };
    }

    formatterTime(data) {
        let m = [];
        for (let x of data) {
            let times = new Date(x.time).getTime();
            let sj = x.sj;
            let time = x.time;
            m.push({times, sj, time})
        }
        m.sort((a, b) => a.time > b.time ? 1 : -1);
        return m;
    }

    componentDidMount() {
        NProgress.start();
        axios.get('/gettimexz').then(res => {
            if (res.data.code === 1) {
                message.warning("数据获取失败");
                return false;
            }
            this.setState({
                data: this.formatterTime(res.data.data)
            });
            NProgress.done();
        });
    }

    render() {
        return (
            <QueueAnim>
                <div key={"sk-body"} className="sk-body">
                    <div key={"sk-body-left"} className="sk-body-left">
                        {this.state.data.length > 0 ?
                            <Timeline key={"asa"} pending="向着明天的太阳走...">
                                {this.state.data.map(v =>
                                    <Item key={v.sj}><span>{v.sj}</span> <span>{v.time}</span></Item>
                                )}
                            </Timeline> : null}
                    </div>
                </div>
            </QueueAnim>
        )
    }
}

export default Timexz;