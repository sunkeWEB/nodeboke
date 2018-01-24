import React from 'react';
import {Button, Icon, message} from 'antd';
import {befoderDay} from './../../utili';
import {withRouter} from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import {connect} from 'react-redux';
import LazyLoad, {forceCheck} from "react-lazyload"

let date, newdate;

@withRouter
@connect(state => state.users, {})
class AriticList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            num: 1,
            oldnum: true
        };
        this.contentNode;
        this.scroll;
        this.scrollHandler = this.handleScroll.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        date = nextProps.selectmenu;
        this.setState({
            data: [],
            num: 1,
            oldnum: true
        });
        setTimeout(() => {
            this.getDate();
        }, 10);
    }

    handleclick(e) {
        this.props.history.push(`/wenzan/${e}`);
    }

    getDate() {
        // console.log(!this.state.oldnum);
        if (!this.state.oldnum) {
            return false;
        }
        axios.get('/infoAritic2', {
            params: {
                dtype: date,
                num: this.state.num
            }
        }).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                if (res.data.data.length < 10) {
                    console.log("<10");
                    this.setState({
                        data: [...this.state.data, ...res.data.data],
                        oldnum: false
                    });
                } else {
                    console.log(">10");
                    console.log([...this.state.data, ...res.data.data]);
                    this.setState({
                        data: [...this.state.data, ...res.data.data],
                        num: this.state.num + 1
                    });
                }
            }
        });
    }

    removeScroll() {
        console.log("数据已经加载完毕");
    }

    componentDidMount() {
        // let scroll = new BScroll('.warpper1');
        // console.log(this.contentNode);
        if (this.contentNode) {
             this.contentNode.addEventListener('scroll', this.scrollHandler.bind(this));
        }
    }


      handleScroll (event) {
        const clientH = event.target.clientHeight;
        const clientW = event.target.scrollHeight;
        const scrollTop = event.target.scrollTop;
        const isBotton = (clientH + scrollTop + 1 >= clientW);
        if (isBotton) {
            setTimeout(()=>{
                this.getDate()
            },10)
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
        } else {
            id = userid.substr(3, userid.length - 4);
        }
        return (
            <div className="warpper1" style={{height: 900, overflow: 'scroll', overflowX: 'hidden'}}
                 ref={node => this.contentNode = node}>
                {this.state.data.length > 0 ? <ul>
                    {this.state.data.map((v, index) => {
                        return (<li key={v.time + Math.random()} style={{
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