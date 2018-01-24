import React from 'react';
import {Button, Icon, message} from 'antd';
import {befoderDay} from './../../utili';
import {withRouter} from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import {connect} from 'react-redux';
import LazyLoad, {forceCheck} from "react-lazyload"
import BScroll from 'better-scroll';
@withRouter
@connect(state => state.users, {})

class AriticList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            num: 1
        };
        this.contentNode
        this.scrollHandler = this.handleScroll.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectmenu) {
            axios.get('/infoAritic2', {
                params: {
                    dtype: nextProps.selectmenu
                }
            }).then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    this.setState({
                        data: res.data.data
                    });
                }
            });
        }
    }

    handleclick(e) {
        this.props.history.push(`/wenzan/${e}`);
    }

    componentDidMount() {
        // let scroll = new BScroll('.warpper1');
        console.log(this.contentNode);
        if (this.contentNode) {
            this.contentNode.addEventListener('scroll', this.scrollHandler.bind(this));
        }
    }


    handleScroll(scroll) {
        console.log(scroll);
        // console.log(event);
        // let scroll = event.path[1].scrollY;
        // let outerHeight = event.path[1].outerHeight;
        // let scrollTop = event.srcElement.body.scrollHeight;
        // console.log();
        // if (scroll + 50 === outerHeight) {
        //     // alert("asa");
        //     console.log("加载");
        //     this._handleScroll(scrollTop);
        // }
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
        } else {
            id = userid.substr(3, userid.length - 4);
        }
        return (
        //     overflow: scroll;
        // overflow-x: hidden;
            <div  className="warpper1" style={{height:900,overflow:'scroll',overflowX:'hidden'}} ref={ node => this.contentNode =node }>
                {this.state.data.length > 0 ? <ul>
                    {this.state.data.map((v, index) => {
                        return (<li key={v.time} style={{
                            paddingTop: 10,
                            paddingBottom: 10,
                            borderBottom: '1px solid rgba(178, 186, 194, 0.4)'
                        }}
                        >
                            <a href="javascript:void(0)" style={{color: "#2e3135"}}>
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
                                            <Button onClick={() => this.dianzan(v._id, `dianzannum${index}`, index)}
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
                </ul> : <div style={{paddingTop: 15, fontSize: 18, textAlign: 'center'}}><p>暂无相关文章</p></div>}
            </div>
        )
    }
}

export default AriticList;