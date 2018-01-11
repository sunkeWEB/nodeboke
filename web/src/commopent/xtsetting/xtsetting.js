import React from 'react';
import axios from 'axios';

class XtSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wznum: 10,
            weixin: '',
            zhifubaoimg: '',
            qq: '',
            wzname: '孙轲技术支持',
            year: new Date().getFullYear(),
            wzbeiannum: ''
        };
    }

    componentWillMount() {
        axios.get('/getwzxx').then(res => {
            if (res.status === 200 && res.data.code === 0) {
                const data = res.data.data[0];
                this.setState({
                    weixin: data.weixin,
                    qq: data.qq,
                    wzbeiannum: data.wzbeiannum,
                    wzname: data.wzname,
                });
            }
        });
    }

    render() {
        return (
            <div>
                <div className="huisecolor">网站信息</div>
                <div>
                    {this.state.wznum > 0 ? <div>你是第 {this.state.wznum} 位采花贼</div> : null}
                    {<div>&copy;{this.state.year} {this.state.wzname}</div>}
                    {this.state.wzbeiannum ? <div>{this.state.wzbeiannum}</div> : null}
                    <div style={{marginTop: 10}}>
                        {this.state.qq ? <img style={{width: 70, height: 70, marginRight: 15}}
                                              src={"/" + this.state.qq.toString()}/> : null}
                        {this.state.weixin ? <img style={{width: 70, height: 70, marginLeft: 15}}
                                                  src={"/" + this.state.weixin.toString()} alt=""/> : null}
                    </div>
                </div>
            </div>
        )
    }

}

export default XtSetting;