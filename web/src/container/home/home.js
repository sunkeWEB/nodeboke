import React from 'react';
import Navmenu from './../../commopent/navmenu/navmenu';
import AriticList from './../../commopent/ariticlist/ariticlist';
import UserInfo from './../../commopent/userinfo/userinfo';
import CommontMax from './../../commopent/commontmax/commontmax';
import XtSetting from './../../commopent/xtsetting/xtsetting';
import {message} from 'antd';
import axios from 'axios';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menudata: [{name: 'all', js: '推荐'}], // 存放文章导航栏
            namenav: '' // 当前选中的导航栏
        };
    }

    componentDidMount() {
        let index = this.props.location.pathname.lastIndexOf('/');
        let url = this.props.location.pathname;
        let path = url.substr(index + 1, url.length);  // 这里的三步是当页面刷新的时候

        axios.get('/getDtype').then(res => {
            if (res.data.code === 0 && res.status === 200) {
                this.setState({
                    menudata: [...this.state.menudata, ...res.data.data],
                    namenav: path === '' ? 'all' : path
                });
            } else {
                message.warning("获取菜单失败");
            }
        });
    }

    handleRoute (key) {
        this.setState({
            namenav:key
        });
        if (key==='all') {
            this.props.history.push(`/`);
        }else{
            this.props.history.push(`/aritic/${key}`);
        }
    }


    render() {
        return (
            <div className="sk-body">
                <div className="sk-body-left">
                    <div style={{display: 'flex', borderBottom: '1px solid rgba(178,186,194,.4)'}}>
                        <div style={{width: 100}}>文章列表</div>
                        <div style={{flex: 1, textAlign: 'right'}}>
                            <ul style={{display: 'flex'}} className="navitemsul">
                                {this.state.menudata.map(v => (
                                    <li className={this.state.namenav === v.name ? 'activenav' : null} key={v.js} style={{marginRight: 20}}
                                        onClick={() => this.state.namenav === v.name ? null : this.handleRoute(v.name)}>
                                        <a  href="javascript:void(0)" className={this.state.namenav === v.name ? 'activenavcolor' : 'noactivenavcolor'} style={{textDecoration:'none',}}>{v.name==='all'?'推荐':v.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <AriticList selectmenu={this.state.namenav ? this.state.namenav:null} />
                </div>
                <div className="sk-body-right">
                    <UserInfo/>
                    <CommontMax selectmenu={this.state.namenav} />
                    <XtSetting/>
                </div>
            </div>
        )
    }
}

export default Home;