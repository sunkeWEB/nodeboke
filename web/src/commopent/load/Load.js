import React from 'react';
import './load.css';

class Loading extends React.Component {
    render() {
        return (
            <div>
                {this.props.load ? <div className="spinner">
                    <div className="rect1"></div>
                    <div className="rect2"></div>
                    <div className="rect3"></div>
                    <div className="rect4"></div>
                    <div className="rect5"></div>
                </div> : null}
            </div>
        )
    }
}

export default Loading;
