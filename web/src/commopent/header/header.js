import React from 'react';
import Logo from './logo.jpg';

class Headers extends React.Component {
    render() {
        return (
            <div className="sk-header">
                <div className="sk-header-item">
                    <img src={Logo} alt="" className="logo" />
                    <ul className="menuitem" style={{marginBottom:0}}>
                        <li>首页</li>
                        <li>资源</li>
                    </ul>
                    <ul style={{flex:1,display:'flex',textAlign:'center',marginBottom:0,alignItems:'center',flexDirection:'row-reverse'}}>
                        <li style={{marginRight:15,color:'#007fff',fontSize:16}}>注册</li>
                        <li style={{marginRight:15,color:'#007fff',fontSize:16}}>登录</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Headers;