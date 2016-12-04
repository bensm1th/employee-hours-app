import React from 'react';
import { browserHistory } from 'react-router';

const NoAuth = () => (
    <div className='ui container'>
        <div className='ui center aligned segment'>
            <div className="error">
                <h1>You must be signed in to do that</h1>
            </div>
        </div>
        <button onClick={()=> browserHistory.push('/signin')} className="ui green button">Sign-in</button>
    </div>
    );

export default NoAuth;