import React from 'react';
import axios from 'axios';
import {message} from 'antd';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {LoadDate} from './reducer/user.redux';

@withRouter
@connect(null,{
    LoadDate
})
class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        axios.get('/users/info1').then(res => {
            if (res.status ===200 && res.data.code===0) {
                const {name,phone} = res.data.data;
                this.props.LoadDate({name,phone});
            }
        });
    }

    render() {
        return null
    }
}

export default Auth;