import React from 'react'
import {withRouter} from 'react-router-dom'

@withRouter
class Navmenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectli: true,
            selectnav:'/'
        };
    }

    handleRoute(e) {
        this.props.handleClick(e);
        this.props.history.push(`/article/${e}`);
    }

    componentWillMount () {

    }

    render() {
        const active = this.props.selectmenu;
        const colortext = {
            color: "#90979c"
        };
        return (
            <div style={{display: 'flex', borderBottom: '1px solid rgba(178,186,194,.4)'}}>
                <div style={{width: 100}}>文章列表</div>
                <div style={{flex: 1, textAlign: 'right'}}>
                    <ul style={{display: 'flex'}} className="navitemsul">
                        {this.props.menudatas.map(v => (
                            <li className={active === v.name ? 'activenav' : null} key={v.js} style={{marginRight: 20}}
                                onClick={(e) => this.handleRoute(v.name, e)}>
                                <a  href="javascript:void(0)" className={active === v.name ? 'activenavcolor' : 'noactivenavcolor'} style={{textDecoration:'none',}}>{v.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Navmenu;