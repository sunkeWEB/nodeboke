import React from 'react';
import {BackTop} from 'antd';

class BackTops extends React.Component {
    render() {
        return (
           <div>
               <BackTop />
               <strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}> gray </strong>
           </div>
        )
    }
}

export default BackTop;