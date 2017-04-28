import React, {Component} from 'react';
import Request from 'superagent';
import classnames from 'classnames';
import Logout from '../logout/main.jsx';
import AppDispatcher from '../../Dispatchers/Dispatcher';
import styles from './main.scss';
import '../../index.scss';
import Planet from '../Planets/main.jsx';
import uuid from 'uuid/v4';
import Store from '../../stores/Store'


class SearchComponent extends Component {
    constructor(args) {
        super(args);
        this.state = {
            'name': null,
            'planets': [],
            'no_results': false,
            'factor': 1,
            'overlimit': false
        };
        this.logoutPath = this.logoutPath.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    }

    logoutPath() {
        window.location = '/';
    }

    componentDidMount() {
        Store.bind('logout', this.logoutPath);
    }

    componentWillUnmount() {
        Store.unbind('logout', this.logoutPath);
    }

    handleSearchSubmit(event) {
        const target = event.target;
        const name = target.name;
        event && event.preventDefault();

        if(target.value === '' || target.value.trim === ''){
            return;
        }

        if (!Store.isInLimit()){
            this.setState({
                overlimit: true
            });
            return;
        }
        this.setState({
            [name]: target.value
        });

        let data = {
            name: target.value.trim()
        };

        Request
            .post('/api/search')
            .send(data)
            .set('Accept', 'application/json')
            .end((err, response) => {
                if (err) {
                    console.log(err);
                } else {
                    let max = 0;
                    response.body.results.map(function (planet) {
                        let population = parseInt(planet.population);
                        if (!isNaN(population) && max < population) {
                            max = population;
                        }
                    });
                    AppDispatcher.dispatch({
                        actionName: 'logSearch'
                    });
                    this.setState({
                        planets: response.body.results,
                        no_results: response.body.count === 0,
                        factor: 100 / max,
                        overlimit: false
                    });
                }
            });
    }

    render() {
        let planets = this.state.planets.map((planet) => {
            let multiple = parseInt(planet.population * this.state.factor, 10);
            if (isNaN(multiple) || multiple === 0) {
                multiple = 1;
            }
            return (
                <Planet key={uuid()} planet={planet} factor={multiple}/>
            );
        });
        let message = this.state.no_results ? 'Couldn\'t find the planets you are looking for.' : null;
        message = this.state.overlimit ? 'You are over your regular limit' : null;

        return (
            <div>
                <form onSubmit={this.handleSearchSubmit} className={classnames(styles['search-form'], 'flex-row')}>
                    <div className={classnames(styles['search-actions'])}>
                        <input type={'text'}
                               name={'name'}
                               className={classnames(styles['search-field'])}
                               placeholder='Type along to search for a planet'
                               onChange={this.handleSearchSubmit}/>
                        <Logout/>
                    </div>
                </form>

                {
                    message
                        ? (
                            <div className={classnames(styles['search-results-container'], 'flex-column')}>
                                <div className={classnames(styles['no-results-heading'])}>
                                    {message}
                                </div>
                                <div className={classnames(styles['no-results'])}/>
                            </div>
                        )
                        : (<div
                            className={classnames(styles['search-results-container'], 'flex-column')}>{planets}</div>)
                }
            </div>
        );
    }
}

export default SearchComponent;
