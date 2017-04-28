import React, {Component} from 'react';
import Request from 'superagent';
import classnames from 'classnames';
import AppDispatcher from '../../Dispatchers/Dispatcher'

import styles from './main.scss';
import '../../index.scss';

class LogoutComponent extends Component {
    constructor(args) {
        super(args);
        this.state = {
        };
        this.handleInputChange = this.handleLogout.bind(this);
    }


    handleLogout(event) {
        event && event.preventDefault();
        Request
            .get('/api/logout')
            .set('Accept', 'application/json')
            .end((err) => {
                if (!err) {
                    AppDispatcher.dispatch({
                        actionName: 'login',
                        loggedin: false
                    });
                }
            });
    }

    render() {
        return (
            <button
                className={classnames(styles['logout-btn'], 'purple')} onClick={this.handleLogout}>
                Logout
            </button>
        );
    }
}

export default LogoutComponent;
