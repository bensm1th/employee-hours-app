import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

class Header extends Component {
    render() {
        const { path, authenticated } = this.props;
        return (
            <Menu inverted pointing>
                <Menu.Menu >
                    <Menu.Item active={path.pathname === '/'} onClick={()=> browserHistory.push('/')}>
                        TLC INFO-MANAGEMENT
                    </Menu.Item>
                    <Menu.Item active={path.pathname === '/hours/index'} onClick={()=> browserHistory.push('/hours/index')}>
                        TABLES
                    </Menu.Item>
                    <Menu.Item active={path.pathname === '/timestamp'} onClick={()=> browserHistory.push('/timestamp')}>
                        CLOCK
                    </Menu.Item>
                    <Menu.Item active={path.pathname === '/employee'} onClick={()=> browserHistory.push('/employee')}>
                        EMPLOYEES
                    </Menu.Item>
                </Menu.Menu>
                { authenticated ? (
                    <Menu.Menu position='right'>
                        <Menu.Item onClick={()=> browserHistory.push('/signout')}>
                            Sign-out
                        </Menu.Item>
                    </Menu.Menu>
                ) : (<Menu.Menu position='right'>
                        <Menu.Item onClick={()=> browserHistory.push('/signin')}>
                            Sign-in
                        </Menu.Item>
                        <Menu.Item onClick={()=> browserHistory.push('/signup')}>
                            Sign-up
                        </Menu.Item>
                    </Menu.Menu>)
                 } 
                
            </Menu>
        )
    }
}

const mapStateToProps = (state) => (
    {
        authenticated: state.auth.authenticated
    }
)

export default connect(mapStateToProps)(Header);

