import React from 'react';
import axios from 'axios';
import Logo from './logo.jpg';
import {message, Icon, Button} from 'antd';
import BackTops from './../backtop/backtop';
import ComCommit from './../commit/commit';
import './../../index.css';
import Cookies from 'js-cookie';
import {befoderDay} from './../../utili';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Carousels from './../../commopent/Carousels/carousel';

@withRouter
@connect(state => state.users, {})
class AriticBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wenzantitle: '',
            wenzanbody: '',
            wenzanpl: [],
            xgdata: [],
            dianzanlist: false,
            kk: 1,
            calcans: [],
            id: this.props.match.params.id
        };
    }

    componentDidMount() {
        let userid = Cookies.get('userids');
        let ids;
        if (userid === undefined) {
            ids = '';
        } else {
            ids = userid.substr(3, userid.length - 4);
        }
        const id = this.state.id;
        axios.get('/infoAritic3', {
            params: {
                id
            }
        }).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                res.data.data.dianzan.map(v => {
                    if (ids === v.dianzanid) {
                        this.setState({
                            dianzanlist: true
                        });
                    }
                });
                let xgdata = res.data.xgdata.filter((v) => id !== v._id);
                this.setState({
                    wenzantitle: res.data.data.title,
                    wenzanbody: res.data.data.body,
                    xgdata: xgdata
                });

                this.loadPingl();
            } else {
                message.warning(res.data.msg);
            }
        });
        axios.get('/getCalcan').then(res => {
            this.setState({
                calcans: res.data.data
            });
        });
    }

    dianzan(e, key, index) {
        message.destroy();
        if (!this.props.isAuth) {
            message.warning("只有登陆才能给赞噢");
            return false;
        }
        axios.post('/dianzan', {e}).then(res => {
            if (res.data.type === -1) {
                this.setState({
                    dianzanlist: false
                });
            } else {
                this.setState({
                    dianzanlist: true
                });
            }

            if (res.data.code === 1) {
                message.warn("点赞失败");
            }
        });
    }

    routerhandle(e) {
        this.setState({
            kk: this.state.kk++,
            id: e
        });
        this.props.history.push(`/wenzan/${e}`);
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

    loadPingl() {
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
        console.log(this.state.calcans);
        return (
            <div>
                <div className="sk-body" onScroll={(e) => console.log(e)}>
                    <div className="commitul" style={{position: 'fixed', top: '200px', marginLeft: -85}}>
                        <ul>
                            <li onClick={() => this.dianzan(this.props.match.params.id)}><a
                                style={{color: '#ccc'}}><Icon type="heart" style={{fontSize: '1.5rem', color: '#ccc'}}
                                                              className={this.state.dianzanlist ? 'dianzan' : 'nodianzan'}
                            /></a></li>
                            <li><a href="#commit-body"><Icon type="message" style={{fontSize: '1.5rem'}}/></a></li>
                        </ul>
                    </div>
                    <div className="sk-body-left">
                        <div className="back" style={{width: 90}}>
                            <Button onClick={() => this.props.history.go(-1)} icon="left">返回</Button>
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
                                {this.state.wenzanpl.reverse().map(v => {
                                    return (
                                        <li className="commit-pl-lists" style={{display: 'flex', padding: '10px 0'}}
                                            key={v.commitscontext + Math.random()}>
                                            <div className="commit-pl-left">
                                                <img src={"/" + v.commitsid.avatar}
                                                     style={{
                                                         width: 40,
                                                         height: 40,
                                                         borderRadius: '50%',
                                                         marginRight: 10
                                                     }}
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
                    <div className="sk-body-right">
                        {this.state.calcans ? <div style={{height: 240}}>
                            <Carousels calcanlist={this.state.calcans} style={{height: 240}}/>
                        </div> : null}
                        <div className="xgaritic">
                            <div>相关文章</div>
                            <div>
                                <ul>
                                    {this.state.xgdata.length > 0 ? this.state.xgdata.map(v => {
                                        return (
                                            <li className="xgwz" key={v._id}><a href={`/wenzan/${v._id}`}
                                                                                target="_blank"
                                                                                style={{color: '#90979c'}}>{v.title}</a>
                                            </li>
                                        )
                                    }) : "没有相关文章咯哦"}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <BackTops/>
                </div>
            </div>
        );
    }
}

export default AriticBody;