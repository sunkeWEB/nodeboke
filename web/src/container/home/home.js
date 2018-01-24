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
            menudata:[],
            namenav:''
        };
    }
    componentWillMount() {
        let index = this.props.location.pathname.lastIndexOf('/');
        let url = this.props.location.pathname;
        let path = url.substr(index+1,url.length);  // 这里的三步是当页面刷新的时候
        axios.get('/getDtype').then(res => {
            if (res.data.code===0 && res.status===200) {
                this.setState({
                    menudata:res.data.data,
                    namenav:path
                });
                if (path==='') {  // 如果用户是直接 通过 / 访问就 刷新到第一个
                    this.props.history.push(`/article/${res.data.data[0].name}`);
                    this.setState({
                        namenav:res.data.data[0].name
                    });
                }
            }else {
                message.warning("获取菜单失败");
            }
        });
    }

    handleclick (e) {
        // console.log(e);
        this.setState({
            namenav:e
        });
        this.props.history.push(`/article/${e}`);
    }
    render() {
        return (
            <div className="sk-body">
                <div className="sk-body-left">
                    <Navmenu handleClick={(e)=>this.handleclick(e)} selectmenu={this.state.namenav}  menudatas={this.state.menudata} />
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