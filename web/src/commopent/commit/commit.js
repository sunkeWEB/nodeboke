import React from 'react';
import {Input, Button, message} from 'antd';
import DefaultAvatar from './defaultavatar.png';
import {connect} from 'react-redux';
import { Emoji } from 'emoji-mart'
const {TextArea} = Input;
message.config({
    top: 60,
    duration: 2,
});
@connect(state=>state.users,{})
class ComCommit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    handleInput(e) {
        this.setState({
            value: e.target.value
        });
    }

    submits() {
        message.destroy();
        if (!this.props.isAuth) { // 没有登录不能进行评论
            message.warning("登录之后才能评论哦");
            return false;
        }

        if (this.state.value === '') {
            message.warn("评论不能为空");
            return false;
        }
        this.props.commitcontext(this.state.value);
        this.setState({
            value:''
        });
    }


    render() {
        return (
            <div id="commit-body">
                <div className="commit-title"
                     style={{textAlign: 'center', fontSize: 18, fontWeight: 600, marginBottom: 10}}>评论
                </div>
                <div className="commit-body-input" style={{display: 'flex'}}>
                    <div className="commit-body-avatar">
                        <img src={this.props.avatar? '/'+this.props.avatar :DefaultAvatar} style={{width: 40, height: 40, borderRadius: '50%', margin: '0 15px'}}
                             alt=""/>
                    </div>
                    <div style={{flex: 1}}>
                        <TextArea onChange={(e) => this.handleInput(e)} placeholder="说说你的看法"
                                  autosize={{minRows: 2, maxRows: 6}} max-lenght="30"/>
                    </div>
                </div>
                <div className="commit-body-footer" style={{textAlign: 'right', marginTop: 10}}>
                    <Button type="primary" onClick={() => this.submits()}>评论</Button>
                </div>
            </div>
        )
    }
}

export default ComCommit;