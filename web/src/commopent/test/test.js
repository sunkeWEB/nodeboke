import React from 'react';

class Test extends React.Component {
    constructor (props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    _handleScroll(scrollTop) {
        console.log(scrollTop)
        //滚动条距离页面的高度
    }

    handleScroll(event) {
        let scrollTop = event.srcElement.body.scrollTop;
        this._handleScroll(event);
    }
    render () {
        return (
            <div>
                <p>AA</p>
                <p>AA</p>
                <p>AA</p>
                <p>AA</p>
                <p>AA</p>
                <p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p><p>AA</p>


            </div>
        )
    }
}

export default Test;