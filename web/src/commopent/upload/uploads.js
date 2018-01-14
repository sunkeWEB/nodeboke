import React from 'react';
import {Upload,Icon} from 'antd';

class UploadImg extends React.Component {
    constructor (props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            fileList:[]
        };
    }

    componentWillReceiveProps () {  // 如果图片是修改
        this.setState({
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: `http://localhost:9093/${this.props.showBtnUpdate}`,
            }]
        });
    }

    componentWillMount () {
        this.setState({
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: `http://localhost:9093/${this.props.showBtnUpdate}`,
            }]
        });
    }

    handleChange({fileList}) {
        let k = false;
        if (fileList.length >= 1 && fileList[0].response) {
            this.setState({calcanavatar: fileList[0].response.path});
            k = true;
            // this.props.handleUploads(fileList[0].response.path);
        }
        this.props.handleUploads(fileList);
        this.setState({showUploadBtn: k, fileList})
    }

    render() {
        // console.log(this.props);
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">点击上传</div>
            </div>
        );
        return (
            <div>
                <Upload
                    name="logo"
                    action="/upload"
                    listType="picture-card"
                    fileList={this.state.fileList}
                    onChange={this.handleChange}
                >
                    {this.props.showBtnUpdate ? null : uploadButton}
                </Upload>
            </div>
        )
    }
}

export default UploadImg;