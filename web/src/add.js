import React from 'react';
import BScroll from 'better-scroll';
import './index.css';

let scroll;

class Add extends React.Component {
    constructor() {
        super();
        this.state = {
            data: new Array(120).fill('indexApp'),
            num: 1
        };
        this.contnetNode = '';
    }

    componentWillMount() {
        if (this.contnetNode) {
            this.contnetNode.addEventListener('scroll', this.onScroller.bind(this));
        }
    }

    componentDidMount() {
        if (this.contnetNode) {
            console.log(this.contnetNode);
            this.contnetNode.addEventListener('scroll', this.onScroller.bind(this));
        }
    }

    onScroller(event) {
        console.log("执行");
        const clientH = event.target.clientHeight;
        const clientW = event.target.scrollHeight;
        const scrollTop = event.target.scrollTop;
        console.log(event);
    }

    // componentDidMount() {
    //     window.addEventListener('scroll', this.scrollHandler);
    //      scroll = new BScroll('.wrapper', {
    //         pullUpLoad: {
    //             threshold: 50
    //         }
    //     });
    //     // scroll.on('pullingUp', this.kk(scroll))
    // }
    //
    // scrollHandler () {
    //     console.log(this.refs.ss);
    //     console.log("asa");
    // }
    // componentWillReceiveProps () {
    //     scroll.on('pullingUp', this.kk(scroll));
    // }
    // kk(scroll) {
    //     this.setState({
    //         num:this.state.num++,
    //         data: new Array(120 * this.state.num).fill('indexApp'),
    //     });
    //     console.log(120 * this.state.num);
    //     scroll.refresh();
    // }
    render() {
        return (
            <div style={{height:500}} className="divappp" ref={node => this.contnetNode = node}>
                <ul>
                    {this.state.data.map((v, index) =>
                        <li key={index}>{v}-- {index}</li>
                    )}
                </ul>
            </div>
        )
    }
}

export default Add;