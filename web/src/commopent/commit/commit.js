import React from 'react';
import {Input, Button,message} from 'antd';
import DefaultImg from './logo.jpg';
const {TextArea} = Input;
class ComCommit extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            value:''
        };
    }

    handleInput (e) {
        this.setState({
            value:e.target.value
        });
    }

    submits () {
        if (this.state.value==='') {
            message.warn("评论不能为空");
            return false;
        }
        this.props.commitcontext(this.state.value);
    }

    render() {
        return (
            <div id="commit-body">
                <div className="commit-title"
                     style={{textAlign: 'center', fontSize: 18, fontWeight: 600, marginBottom: 10}}>评论
                </div>
                <div className="commit-body-input" style={{display: 'flex'}}>
                    <div className="commit-body-avatar">
                        <img src={DefaultImg} style={{width: 40, height: 40, borderRadius: '50%', margin: '0 15px'}}
                             alt=""/>
                    </div>
                    <div style={{flex: 1}}>
                        <TextArea onChange={(e)=>this.handleInput(e)} placeholder="说说你的看法" autosize={{minRows: 2, maxRows: 6}} max-lenght="30"/>
                    </div>
                </div>
                <div className="commit-body-footer" style={{textAlign: 'right', marginTop: 10}}>
                    <Button type="primary" onClick={()=>this.submits()} >评论</Button>
                </div>
            </div>
        )
    }
}

export default ComCommit;