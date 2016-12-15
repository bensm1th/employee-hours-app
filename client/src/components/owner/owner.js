import React, { Component }  from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchManagers, changeManagerFilter, updateManager, deleteManager, signupUser, clearAuthErrorMessage } from '../../actions/index';
import { Link } from 'react-router';
import { Grid, Menu, Segment } from 'semantic-ui-react'
import Managers from './managers/managers';
import Payroll from './payroll';
import Students from './students';

class Owner extends Component {

    state = { activeItem: 'Managers' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })


    componentWillMount() {
        this.props.fetchManagers()
    }

    renderOwnerTools() {
        const active = this.state.activeItem;
        switch(active) {
            case 'Managers':
                return <Managers {...this.props}/>;
            case 'Payroll':
                return <Payroll {...this.props}/>;
            case 'Students':
                return <Students {...this.props}/>;
            default: 
                return <Managers/>;
        }
    }

    render() {
        const { activeItem } = this.state
        return (
            <div className='ui container'>
                <div className='ui center aligned segment'> <h1> OWNER MANAGEMENT TOOLS </h1> </div>
                <Grid>
                    <Grid.Column width={4}>
                    <Menu fluid vertical tabular>
                        <Menu.Item name='Managers' active={activeItem === 'Managers'} onClick={this.handleItemClick} />
                        <Menu.Item name='Payroll' active={activeItem === 'Payroll'} onClick={this.handleItemClick} />
                        <Menu.Item name='Students' active={activeItem === 'Students'} onClick={this.handleItemClick} />
                    </Menu>
                    </Grid.Column>

                    <Grid.Column stretched width={12}>
                    <Segment>
                        {this.renderOwnerTools()}
                    </Segment>
                    </Grid.Column>
                </Grid>
            
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        managers: state.ownerTools.managers,
        tables_finalized: state.ownerTools.tables_finalized,
        tables_approved: state.ownerTools.tables_approved,
        manager_filter: state.ownerTools.manager_filter,
        active_manager: state.ownerTools.active_manager,
        errorMessage: state.auth.error
    }
}

export default connect(mapStateToProps, { fetchManagers, changeManagerFilter, updateManager, deleteManager, signupUser, clearAuthErrorMessage })(Owner);