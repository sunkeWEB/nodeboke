import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {loadDate} from './../../reducer/user.redux';
import
@withRouter
@connect(null, {loadDate})
class AuthRoute extends React.Component {
    componentDidMount() {
        const publicList = ['/login'];
        const pathname = this.props.location.pathname;
        if (publicList.indexOf(pathname) > -1) {
            return false;
        }
        axios.get('/users/info').then((res) => {
            if (res.status === 200) {
                if (res.data.code === 0) {
                    // 有登录信息
                    this.props.loadDate(res.data.data);
                } else {
                    // 没有登录信息
                    this.props.history.push('/login');
                }
            }
        })
    }

    render() {
        return null;
    }
}

export default AuthRoute;