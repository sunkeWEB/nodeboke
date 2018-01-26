import React from 'react';
import error from './notfound.png';

class ErrorPage extends React.Component {
    render() {
        return (
            <div style={{textAlign: "center",paddingTop:50}}>
             <img style={{width:'100%',height:300,maxWidth:500}} src={error} alt=""/>
            </div>
        )
    }
}

export default ErrorPage;