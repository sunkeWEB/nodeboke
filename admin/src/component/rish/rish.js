import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class ReactQuills extends React.Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(value) {
        this.setState({text: value})
    }

    render() {
        const modules = {
            toolbar: [
                // [{ 'font': [] }],
                [{'header': [1, 2, false]}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                // [{ 'align': [] }],
                // [{ 'color': [] }, { 'background': [] }],
                ['link', 'image'],
                ['clean']
            ],
        };
        const formats = [
            'header',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image'
        ];
        return (
            <ReactQuill value={this.state.text}
                        onChange={this.props.handleBody}
                        modules={modules}
                        formats={formats}
            />
        )
    }
}

export default ReactQuills;