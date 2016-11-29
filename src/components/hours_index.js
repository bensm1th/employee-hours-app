import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTables } from '../actions/index';
import { v4 } from 'node-uuid';
import { Link } from 'react-router';

class HoursIndex extends Component {

    componentDidMount() {
        this.props.fetchTables();
    }

   renderTables() {
       return this.props.tables.map(table => {
           console.log(table);
           const length = table.dates.length - 1;
           return (
                <Link key={v4()} to={`hourstable/${table._id}`}>
                    <li key={v4()}>{table.dates[0]} - {table.dates[length]} </li>
                </Link>
            )
       })
   }
    render() {
        return (
            <div className="ui container">
                Current tables by start and ends dates:
                <ul>
                    {this.renderTables()}
                </ul>
                 <Link to='/hours'><button className="ui green button">create table</button></Link>
                 <Link to='/'><button className="ui blue button">back</button></Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tables: state.tables.tables
    }
}

export default connect(mapStateToProps, { fetchTables })(HoursIndex);