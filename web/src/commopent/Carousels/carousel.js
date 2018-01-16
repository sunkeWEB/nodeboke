import React from 'react';
import { Carousel } from 'antd';
class Carousels extends React.Component {
    constructor(props){
        super(props);
    }
    // calcanlist
    render () {
        return (
            <div>
                <Carousel autoplay>
                    {this.props.calcanlist.map(v=>{
                        return (
                            <img src={'/'+v.imgurl} alt=""/>
                        )
                    })}
                </Carousel>
            </div>
        )
    }
}

export default Carousels;