import React, {Component} from 'react';
import classnames from 'classnames';

import styles from './main.scss';
import '../../index.scss';

class PlanetaryItem extends Component {
    render() {
        return (
            <div className={classnames(styles['planet-fields'])}
                 style={{borderRight: 'solid ' + this.props.factor + 'px #9b59b6'}}>
                <div className={classnames(styles['planet-details'], 'flex-row')}>
                    <div className={classnames(styles['planet-container'])}>
                        <h3 className={classnames(styles['name'], 'purple')}>{this.props.planet.name}</h3>
                        <div className={classnames(styles['field'])}>Rotation period :
                            <span className={classnames(styles['value'])}>   {this.props.planet.rotation_period}</span></div>
                        <div className={classnames(styles['field'])}>Orbital period :
                            <span className={classnames(styles['value'])}>   {this.props.planet.orbital_period}</span></div>
                        <div className={classnames(styles['field'])}>Diameter :
                            <span className={classnames(styles['value'])}>   {this.props.planet.diameter}</span></div>
                        <div className={classnames(styles['field'])}>Gravity :
                            <span className={classnames(styles['value'])}>   {this.props.planet.gravity}</span></div>
                        <div className={classnames(styles['field'])}>Terrain :
                            <span className={classnames(styles['value'])}>   {this.props.planet.terrain}</span></div>
                        <div className={classnames(styles['field'])}>Climate :
                            <span className={classnames(styles['value'])}>   {this.props.planet.climate}</span></div>
                        <div className={classnames(styles['field'])}>Surface water :
                            <span className={classnames(styles['value'])}>   {this.props.planet.surface_water}</span></div>
                        <div className={classnames(styles['field'])}>Population :
                            <span className={classnames(styles['value'])}>   {this.props.planet.population}</span></div>
                        <div className={classnames(styles['field'])}>Residents :
                            <span className={classnames(styles['value'])}>   {this.props.planet.residents.length}</span></div>
                        <div className={classnames(styles['field'])}>Films :
                            <span className={classnames(styles['value'])}>   {this.props.planet.films.length}</span></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PlanetaryItem;
