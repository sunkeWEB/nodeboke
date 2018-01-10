import React from 'react'

class Navmenu extends React.Component {
    render() {
        const arritem = [
            {name: 'html/css', key: 1},
            {name: 'node', key: 2},
            {name: 'react', key: 3},
            {name: 'vue', key: 4},
        ];
        return (
            <div style={{display:'flex',borderBottom:'1px solid rgba(178,186,194,.4)'}}>
                <div style={{width:100}}>热门文章</div>
                <div style={{flex:1,textAlign:'right'}}>
                    <ul style={{display:'flex'}} className="navitemsul">
                        {arritem.map(v=>(
                            <li key={v.key} style={{marginRight:20}}>{v.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Navmenu;