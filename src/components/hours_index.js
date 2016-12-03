import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTables } from '../actions/index';
import { v4 } from 'node-uuid';
import { Link } from 'react-router';

class HoursIndex extends Component {

    componentDidMount() {
        localStorage.clear();
        this.props.fetchTables();
    }

   renderTables() {
       return this.props.tables.map(table => {
           const length = table.dates.length - 1;
           return (
                <Link key={v4()} to={`/hourstable/${table._id}`}>
                    <li className='ui item' key={v4()}>{table.dates[0]} - {table.dates[length]} </li>
                </Link>
            )
       })
   }
    render() {
        const tables = this.props.tables ? this.renderTables() : '';
        return (
            <div className="ui container">
                <div className='ui center aligned segment'>
                    <h1> CURRENT TABLES </h1>
                </div>
                <div className='ui center aligned  segment'>
                    <ul className='ui list'>
                        {tables}
                    </ul>
                    <Link to='/hours'><button className="ui green button">create table</button></Link>
                    <Link to='/'><button className="ui orange button">back</button></Link>
                 </div>
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