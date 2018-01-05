import React from 'react';
import { Link } from 'react-router-dom';
class Breadcrumb extends React.Component {
    itemRender (route, params, routes, paths) {
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
    }
    render () {
        const routes = [{
            path: 'index',
            breadcrumbName: '首页'
        }, {
            path: 'first',
            breadcrumbName: '一级面包屑'
        }, {
            path: 'second',
            breadcrumbName: '当前页面'
        }];

        return (
            <Breadcrumb  routes={routes}/>
        )
    }
}

export default Breadcrumb;