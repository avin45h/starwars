import React, {Component} from 'react';
import Request from 'superagent';
import classnames from 'classnames';
import AppDispatcher from '../../Dispatchers/Dispatcher'

import styles from './main.scss';
import '../../index.scss';

class LoginComponent extends Component {
    constructor(args) {
        super(args);
        this.state = {
            'username': '',
            'password': '',
            'error': '',
            'btnDisabled': false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLoginFormSubmit = this.handleLoginFormSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: target.value
        });
    }

    handleLoginFormSubmit(event) {
        event && event.preventDefault();
        this.setState({
            btnDisabled: true
        });

        let data = {
            'username': this.state.username,
            'password': this.state.password
        };

        Request
            .post('/api/login')
            .send(data)
            .set('Accept', 'application/json')
            .end((err, response) => {
                if (err) {
                    if (err) {
                        this.setState({
                            error: "Something went wrong",
                            btnDisabled: false
                        });
                    }
                } else {
                    let limit = JSON.parse(response.text).limit || undefined;
                    AppDispatcher.dispatch({
                        actionName: 'login',
                        loggedin: true,
                        limit: limit
                    });
                    window.location = '/search';
                }
            });
    }

    render() {
        return (
            <div>
                {
                    this.state.error
                        ? (
                            <div className={classnames(styles['error-toast-container'])}>
                                  <span className={classnames(styles['error-toast'], 'red')}>
                                    Citizen does not exist or you're an impersonator! <br/> The force is not with you &lt;(-_-)&gt;
                                  </span>
                            </div>
                        )
                        : null
                }
                <div className={classnames(styles['form-container'], 'flex-column')}>
                    <div className={classnames(styles['form-heading'])}>
                        <h1 className={classnames(styles['heading'])}>Inter-Galactic <br/> Planetary Database</h1>
                        <h3 className={classnames(styles['sub-heading'])}>Log in to continue</h3>
                        <form className={classnames(styles['form'], 'flex-column')}
                              onSubmit={this.handleLoginFormSubmit}>

                            <input type={'text'}
                                   className={classnames(styles['ui-input'])}
                                   name={'username'}
                                   onChange={this.handleInputChange}
                                   value={this.state.username}
                                   placeholder='Citizen Name'/>
                            <input type={'password'}
                                   className={classnames(styles['ui-input'])}
                                   name={'password'}
                                   onChange={this.handleInputChange}
                                   value={this.state.password}
                                   placeholder='When were you born?'/>
                            <div className={classnames(styles['form-action'])}>
                                <input type='submit'
                                       className={classnames({[styles['btn-disabled']]: this.state.btnDisabled}, styles['ui-btn'])}
                                       value='Log In'/>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginComponent;
