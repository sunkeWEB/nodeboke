import React from 'react';
import {Button,Icon} from 'antd';
import {befoderDay} from './../../utili';
import axios from 'axios';
import { lazyload } from 'react-lazyload';

@lazyload({
    height: 200,
    once: true,
    offset: 100
})

class AriticList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentWillMount() {
        axios.get('/infoAritic2').then(res => {
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
                <ul>
                    {this.state.data.map(v => {
                        return (<li key={v.time} style={{
                            paddingTop: 10,
                            paddingBottom: 10,
                            borderBottom: '1px solid rgba(178, 186, 194, 0.4)'
                        }}>
                            <div style={{display:'flex',alignItems:"center"}}>
                                <div style={{flex:1}}>
                                    <div className="header">
                                        <span>{v.author}</span>
                                        <span>{befoderDay(v.time)}</span>
                                        <span>{v.dtype}</span>
                                    </div>
                                    <div className="list-body">
                                        {v.title}
                                    </div>
                                    <div className="list-footer">
                                        <Button style={{padding:"0 3px",height:'22px'}}><Icon type="heart" />12</Button>
                                        <Button style={{padding:"0 3px",height:'22px',marginLeft:5}}><Icon type="message" />12</Button>
                                    </div>
                                </div>
                                <div className="ariticimg" style={{width:60,height:60}}>
                                    <img src={v.fmimg} style={{width:60,height:60}} alt=""/>
                                </div>
                            </div>
                        </li>)
                    })}
                </ul>
            </div>
        )
    }
}

export default AriticList;