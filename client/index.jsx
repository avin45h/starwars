import React, { Component } from 'react';
import { render } from 'react-dom';
import { requireAuthentication } from './utils/authentication.jsx';
import { Router, Route, browserHistory } from 'react-router';
import SearchComponent from './components/Search/main.jsx';



import LoginComponent from './components/Login/main.jsx';

const APP_CONTAINER_NAME = 'app-container';

class App extends Component {
    constructor (args) {
        super(args);
        this.state = {};
    }

    render () {
        return (
            <Router history={browserHistory}>
                <Route path='/' name={'login'} component={LoginComponent} />
                <Route path='/search' name={'search'} component={SearchComponent}  onEnter={requireAuthentication}/>
            </Router>
        );
    }
}

window.addEventListener('DOMContentLoaded', () => {
    let appContainer = document.getElementById(APP_CONTAINER_NAME);

    if (!appContainer) {
        appContainer = document.createElement('DIV');
        appContainer.id = APP_CONTAINER_NAME;
        document.body.appendChild(appContainer);
    }

    render(<App />, appContainer);
});
