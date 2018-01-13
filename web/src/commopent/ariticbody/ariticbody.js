import React from 'react';
import axios from 'axios';
import {message, Icon} from 'antd';
import BackTops from './../backtop/backtop';
import ComCommit from './../commit/commit';
import './../../index.css';
import DefaultAvatar from './defaultavatar.png';
import {befoderDay} from './../../utili';

class AriticBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wenzantitle: '',
            wenzanbody: '',
            wenzanpl: []
        };
    }

    componentWillMount() {
        const id = this.props.match.params.id;
        axios.get('/infoAritic3', {
            params: {
                id
            }
        }).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                this.setState({
                    wenzantitle: res.data.data.title,
                    wenzanbody: res.data.data.body
                });
                this.loadPingl();
            } else {
                message.warning(res.data.msg);
            }
        });
    }

    handlesubmit(e) {
        let id = this.props.match.params.id;
        axios.post('/pjrk', {id, e}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                this.loadPingl();
            } else {
                message.warning(res.data.msg)
            }
        })
    }

    loadPingl() {   //
        let id = this.props.match.params.id;
        axios.get('/getariticpj', {params: {id: id}}).then(res1 => {
            if (res1.status === 200 && res1.data.code === 0) {
                this.setState({
                    wenzanpl: res1.data.data
                });
            } else {
                message.warning(res1.data.msg)
            }
        })
    }

    render() {
        console.log(this.state.wenzanpl);
        return (
            <div className="sk-body">
                <div className="commitul" style={{position: 'fixed', top: '200px', marginLeft: -85}}>
                    <ul>
                        <li><a><Icon type="heart" style={{fontSize: '1.5rem', color: '#1890ff'}}/></a></li>
                        <li><a href="#commit-body"><Icon type="message" style={{fontSize: '1.5rem'}}/></a></li>
                    </ul>
                </div>
                <div className="sk-body-left">
                    <div className="back" style={{width: 90}}>
                        <Icon type="left" style={{fontSize: 20}} onClick={() => this.props.history.go(-1)}/>
                    </div>
                    <div className="aouth">
                    </div>
                    <h1 className="wenzantitle" style={{fontSize: '2rem'}}>{this.state.wenzantitle}</h1>
                    <div id="Link-Props" className="wenzanbody"
                         dangerouslySetInnerHTML={{__html: this.state.wenzanbody}}/>
                    <div className="commit-div">
                        {this.state.wenzanbody ? <ComCommit commitcontext={(e) => this.handlesubmit(e)}/> : null}
                    </div>
                    <div className="commit-lists">
                        <ul>
                            {this.state.wenzanpl.map(v => {
                                return (
                                    <li className="commit-pl-lists" style={{display: 'flex', padding: '10px 0'}}
                                        key={v.commitscontext + Math.random()}>
                                        {/*{v.commitscontext}*/}
                                        <div className="commit-pl-left">
                                            <img src={"/"+v.commitsid.avatar}
                                                 style={{width: 40, height: 40, borderRadius: '50%', marginRight: 10}}
                                                 alt=""/>
                                        </div>
                                        <div className="commit-pl-left">
                                            <div className="commit-pl-name">
                                                <span>{v.commitsid.name}</span>
                                                <span className="commitsttime">{befoderDay(v.commitsttime)}</span>
                                            </div>
                                            <div>{v.commitscontext}</div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="sk-body-right">B</div>
                <BackTops/>
            </div>
        )
    }
}

export default AriticBody;