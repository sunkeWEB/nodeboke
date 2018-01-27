import React from 'react';
import {Button, Icon, message} from 'antd';
import {befoderDay} from './../../utili';
import {withRouter} from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import {connect} from 'react-redux';
import LazyLoad, {forceCheck} from "react-lazyload"
import Loading from './../load/Load';
import QueueAnim from 'rc-queue-anim';
@withRouter
@connect(state => state.users, {})
class AriticList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            num: 1,
            oldnum: true,
            load: true,
            nodata: false,
            flage: false,
            oldactive: ''
        };
        this.scroll;
        this.active
        this.handleScroll = this.handleScroll.bind(this);
    }

    // componentDidMount() {
    //     console.log("componentWillMount");
    //     const path = this.props.location.pathname;
    //     let dtype, alls;
    //     // if (path === '/') {
    //     //     alls = '/';
    //     //     axios.get('/tjlist', {params: {all: alls, dtype: dtype}}).then(res => {
    //     //         if (res.data.data.length > 0) {
    //     //             this.setState({
    //     //                 data: res.data.data,
    //     //                 nodata: true
    //     //             });
    //     //         }
    //     //         setTimeout(() => {
    //     //             if (this.state.data.length === 0) {
    //     //                 this.setState({
    //     //                     nodata: true
    //     //                 });
    //     //             }
    //     //         }, 800)
    //     //     })
    //     // } else {
    //     //     dtype = path.substr(9);
    //     //     axios.get('/infoAritic2', {
    //     //         params: {
    //     //             dtype: dtype,
    //     //             num: this.state.num
    //     //         }
    //     //     }).then(res => {
    //     //         if (res.status === 200 && res.data.code === 0) {
    //     //             if (res.data.data.length < 10) {
    //     //                 this.setState({
    //     //                     data: [...this.state.data, ...res.data.data],
    //     //                     oldnum: false,
    //     //                     nodata: true
    //     //                 });
    //     //             } else {
    //     //                 this.setState({
    //     //                     nodata: true,
    //     //                     data: [...this.state.data, ...res.data.data],
    //     //                     num: this.state.num + 1
    //     //                 });
    //     //             }
    //     //         }
    //     //     });
    //     // }
    //     this.setState({
    //         flage: true
    //     });
    // }

    async componentWillReceiveProps(nextProps, nextState) {
        if (this.state.oldactive !== nextProps.selectmenu) {
            await this.set();
        }
        this.active = nextProps.selectmenu;
        this.setState({
            oldactive: this.active
        });
        if (this.active === 'all') {   // 进入推荐页面
            axios.get('/tjlist', {params: {all: 'all'}}).then(res => {
                if (res.data.data.length > 0) {
                    this.setState({
                        data: res.data.data,
                        nodata: true
                    });
                }
                if (this.state.data.length === 0) {
                    this.setState({
                        nodata: true
                    });
                }
            })
        } else {
            this.getDate();
        }
    }

    set() {
        return new Promise((resolve, reject) => {
            this.setState({
                data: [],
                num: 1,
                oldnum: true,
                load: true,
                nodata: false,
                flage: true,
                oldactive: ''
            });
            resolve();
        })
    }

    handleclick(e) {
        this.props.history.push(`/wenzan/${e}`);
    }

    removeScroll() {
        console.log("数据已经加载完毕");
    }

    componentDidMount() {
        if (this.contentNode) {
            this.contentNode.addEventListener('scroll', this.handleScroll);
        }
    }

    handleScroll(event) {
        const clientHeight = event.target.clientHeight;
        const scrollHeight = event.target.scrollHeight;
        const scrollTop = event.target.scrollTop;
        if ((clientHeight + scrollTop).toFixed(0) * 1 === scrollHeight && this.state.flage) {
            this.getDate(this.active);
        }
    }

    getDate() {
        if (this.active) {
            axios.get('/infoAritic2', {
                params: {
                    dtype: this.active,
                    num: this.state.num
                }
            }).then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    if (res.data.data.length < 10) {
                        this.setState({
                            data: [...this.state.data, ...res.data.data],
                            oldnum: false,
                            nodata: true,
                            flage: false
                        });
                    } else {
                        this.setState({
                            data: [...this.state.data, ...res.data.data],
                            num: this.state.num + 1,
                            nodata: true
                        });
                    }
                }
            });
        }
    }


    dianzan(e, key, index) {
        message.destroy();
        if (!this.props.isAuth) {
            message.warning("只有登陆才能给赞噢");
            return false;
        }
        axios.post('/dianzan', {e}).then(res => {
            if (res.data.code === 1) {
                message.warn("点赞失败");
            } else {
                this.props.history.push(this.props.location.pathname);
            }
        });
    }

    render() {
        let userid = Cookies.get('userids');
        let id;
        if (userid === undefined) {
            id = '';
        }
        else {
            id = userid.substr(3, userid.length - 4);
        }
        const heights = {
            height:700
        };
        return (
            <div className="warpper1" style={this.state.data.length>=10?heights:null}
                 ref={node => this.contentNode = node}>
                {this.state.nodata ? this.state.data.length > 0 ? <QueueAnim ><ul key={"asa"}>
                        {this.state.data.map((v, index) => {
                            return (<li key={v.time + Math.random()} style={{
                                paddingTop: 10,
                                paddingBottom: 10,
                                borderBottom: '1px solid rgba(178, 186, 194, 0.4)'
                            }}
                            >
                                <a target="_blank" href="javascript:void(0)" style={{color: "#2e3135"}}>
                                    <div style={{display: 'flex', alignItems: "center"}}>
                                        <div style={{flex: 1}}>
                                            <div className="header">
                                                <span>{v.author}</span>
                                                <span>{befoderDay(v.time)}</span>
                                                <span>{v.dtype}</span>
                                            </div>
                                            <div onClick={() => this.handleclick(v._id)} className="list-body">
                                                {v.title}
                                            </div>
                                            <div className="list-footer">
                                                <Button
                                                        style={{padding: "0 3px", height: '22px'}}><Icon
                                                    className={v.dianzan.map(v =>
                                                        v.dianzanid === id ? "dianzan" : ""
                                                    )}
                                                    type="heart"/><span ref={`dianzannum${index}`}>{v.dianzan.length}</span></Button>

                                                <Button style={{padding: "0 3px", height: '22px', marginLeft: 5}}><Icon
                                                    type="message"/><span>{v.commits.length}</span></Button>
                                            </div>
                                        </div>
                                        <div className="ariticimg" style={{width: 60, height: 60}}>
                                            <LazyLoad height={60}>
                                                <img src={"/" + v.fmimg} style={{width: 60, height: 60}} alt=""/>
                                            </LazyLoad>
                                        </div>
                                    </div>
                                </a>
                            </li>)
                        })}
                    </ul></QueueAnim> : <div style={{paddingTop: 15, fontSize: 18, textAlign: 'center'}}><p>暂无相关文章</p></div> :
                    <Loading load={this.state.load}/>}
            </div>
        )
    }
}

export default AriticList;