import React, {Component} from 'react';
import {Layout, Menu, Icon, Popconfirm} from 'antd';
import {withRouter, Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import browserCookies from 'browser-cookies';
import UpdatePwd from './container/updatepwd/updatepwd';
import Article from './container/article/article';
import {Logout} from './reducer/user.redux';
import ArticleCom from './component/artic/articcom';

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
            pathurl: ''
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

    handleClick(e) {
        this.props.history.push(e);
    }

    render() {
        return (
            <Layout>
                {this.props.redicertTo && this.props.redicertTo === '/login' ?
                    <Redirect to={this.props.redicertTo}/> : null}
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo"/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}
                          onClick={(e) => this.handleClick(e.key)}>
                        <Menu.Item key="1">
                            <Icon type="user"/>
                            <span>nav 1</span>
                        </Menu.Item>
                        <Menu.Item key="article">
                            <Icon type="video-camera"/>
                            <span>文章管理</span>
                        </Menu.Item>
                        <Menu.Item key="/updatepwd">
                            <Icon type="upload"/>
                            <span>修改密码</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: 'deepskyblue', padding: 0, display: "flex", color: '#fff'}}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                            style={{color: '#fff'}}
                        />
                        <div style={{flex: 1, textAlign: 'right', marginRight: 25}}>
                            <Popconfirm placement="topLeft" title="你确定退出吗？" onConfirm={this.logout} okText="退出"
                                        cancelText="取消">
                                <Icon type="poweroff" style={{fontSize: 20}}/>
                            </Popconfirm>
                        </div>
                    </Header>
                    <Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>
                        <Switch>
                            <Route path="/updatepwd" component={UpdatePwd}/>
                            <Route path="/article" component={Article}/>
                            <Route path="/articleadd" component={ArticleCom}/>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default App;