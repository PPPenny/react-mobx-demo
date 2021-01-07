import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import rootStore from './stores/RootStore';
import loadable from 'react-loadable';
import ErrorBoundary from './components/ErrorBoundary';
import Loading from './components/Loading'

//加载新页面的过度loader
const MyLoadingComponent = ({ isLoading, error }) => {
    if (isLoading) {
        return <Loading />;
    } else if (error) {
        return <div>加载页面出错，请刷新</div>;
    } else {
        return null;
    }
};
// 页面导入组件
const pageLoader = importFuction => {
    return loadable({ delay: 300, loader: importFuction, loading: MyLoadingComponent });
};
/**
 * 如果要移除切换动画，请删除组件 AnimatedSwitch
 */
export default class App extends Component {
    render() {
        return (
            <Provider {...rootStore}>
                <Router basename={process.env.PUBLIC_URL}>
                    <ErrorBoundary>
                        <Route path="/" exact component={pageLoader(() => import('./pages/home/Home'))} />
                        <Route path='/demo' exact component={pageLoader(() => import('./pages/home/Demo'))} />
                        <Route path='/params' exact component={pageLoader(() => import('./pages/demo/Father'))} />
                        <Route path='/bind' exact component={pageLoader(() => import('./pages/demo/BindThis'))} />
                        <Route path="/my" exact component={pageLoader(() => import('./pages/my/Index'))} />
                        <Route path='/animate' exact component={pageLoader(() => import('./pages/animate/Index'))} />
                        <Route path='/list' exact component={pageLoader(() => import('./pages/list/Index'))} />
                        <Route path='/detail/:id' exact component={pageLoader(() => import('./pages/list/Detail'))} />
                        <Route path='/member/list' exact component={pageLoader(() => import('./pages/member/List'))} />
                    </ErrorBoundary>
                </Router>
            </Provider>
        );
    }
}
