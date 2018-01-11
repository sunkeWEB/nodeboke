import React from 'react';

class ErrorPage extends React.Component {
    render() {
        console.log(this.props);
        return (
            <div style={{textAlign: "center"}}>
                <div><p style={{fontSize: 100, marginBottom: 0}}>404</p></div>
                <div>
                    <p>你来到了一个不可告人的人空间</p>
                    <p onClick={()=>this.props.history.go(-1)} style={{padding:10,fontWeight:600,fontSize:20}}>戳我-->>回人间</p>
                </div>
            </div>
        )
    }
}

export default ErrorPage;