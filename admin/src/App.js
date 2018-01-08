import React, {Component} from 'react';
import {Layout, Menu, Icon, Popconfirm} from 'antd';
import {withRouter, Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import browserCookies from 'browser-cookies';
import UpdatePwd from './container/updatepwd/updatepwd';
import Article from './container/article/article';
import {Logout} from './reducer/user.redux';
import ArticleCom from './component/artic/articcom';
import ArticleComUpdate from './component/artic/articlecomupdate';
import Timexyz from './component/timexyz/timexyz';
import UserInfo from './component/userinfo/userinfo';
import Calcan from './component/calcan/calcan';
const {Header, Sider, Content} = Layout;

@withRouter
@connect(state => state.user, {
    Logout
})
class App extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            collapsed: true,
            pathurl: '',
            current:'/index'
        };
    }

    toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    logout() {
        browserCookies.erase('userid');
        this.props.Logout();
    }

    componentWillMount () {
        this.setState({
            current:this.props.location.pathname
        });
    }

    handleClick(e) {
        this.setState({
            current:e
        });
        this.props.history.push(e);
    }

    render() {
        const url = "http://127.0.0.1:9093/";
        // this.props.location.pathname;
        return (
            <Layout>
                {this.props.redicertTo && this.props.redicertTo === '/login' ?
                    <Redirect to={this.props.redicertTo}/> : null}
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo1">
                        <img  className="logo" src={`${url}${this.props.avatar}`} alt=""/>
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}
                          onClick={(e) => this.handleClick(e.key)}
                          selectedKeys={[this.state.current]}
                    >
                        <Menu.Item key="/index">
                            <Icon type="laptop"/>
                            <span>首页</span>
                        </Menu.Item>
                        <Menu.Item key="/article">
                            <Icon type="profile"/>
                            <span>文章管理</span>
                        </Menu.Item>
                        <Menu.Item key="/timexyz" onClick={(item, key, keyPath)=>this.selectItem(item, key, keyPath)}>
                            <Icon type="hourglass"/>
                            <span>时光轴</span>
                        </Menu.Item>
                        <Menu.Item key="/calcan">
                            <Icon type="area-chart"/>
                            <span>跑马灯</span>
                        </Menu.Item>
                        <Menu.Item key="/userinfo">
                            <Icon type="idcard"/>
                            <span>个人信息</span>
                        </Menu.Item>
                        <Menu.Item key="/updatepwd">
                            <Icon type="lock"/>
                            <span>修改密码</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: 'deepskyblue', padding: 0, display: "flex", color: '#fff',position: 'fixed', width: '96%',zIndex:100000}}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                            style={{color: '#fff'}}
                        />
                        <div style={{flex: 1, textAlign: 'right'}}>
                            <Popconfirm placement="topLeft" title="你确定退出吗？" onConfirm={this.logout} okText="退出"
                                        cancelText="取消">
                                <Icon type="poweroff" style={{fontSize: 20,marginRight:100}}/>
                            </Popconfirm>
                        </div>
                    </Header>
                    <Content style={{margin: '24px 16px', padding: 24, background: '#fff',marginTop:80}}>
                        <Switch>
                            <Route path="/calcan" component={Calcan} />
                            <Route path="/updatepwd" component={UpdatePwd}/>
                            <Route path="/article" component={Article}/>
                            <Route path="/articleadd" component={ArticleCom}/>
                            <Route path="/timexyz" component={Timexyz}/>
                            <Route path="/articleupdate/:id" component={ArticleComUpdate}/>
                            <Route path="/userinfo" component={UserInfo}/>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default App;