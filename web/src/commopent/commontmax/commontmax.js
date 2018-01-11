import React from 'react';
import axios from 'axios';

class CommontMax extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            name:''
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            name: nextProps.selectmenu
        });
        setTimeout(()=>{
            axios.get('/tjlist', {
                params: {dtype: this.state.name}
            }).then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    this.setState({
                        data: res.data.data
                    });
                }
            });
        },0)
    }

    render() {
        return (
            <div style={{marginTop: 15}}>
                <div style={{paddingBottom: 5, color: '#999'}}><span>{this.props.selectmenu}</span> 博主推荐</div>
                {this.state.data.length>0? (
                        <ul>
                            {this.state.data.map(v => {
                                return <li className="bztjli" key={v.title}>{v.title}</li>
                            })}
                        </ul>
                ):"博主正在抓紧收集中..."}
            </div>
        )
    }
}

export default CommontMax;