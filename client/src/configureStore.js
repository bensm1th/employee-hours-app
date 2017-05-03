import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import { loadState, saveState } from './localStorage';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { AUTH_USER, AUTH_OWNER, ID_USER } from './actions/types';

const configureStore = () => {
    const logger = createLogger();
    const createStoreWithMiddleware = applyMiddleware(thunk, promise, logger)(createStore);
    const store = createStoreWithMiddleware(reducers);
    const token = localStorage.getItem('token');
    const ownerToken = localStorage.getItem('ownerToken');
    const managerId = localStorage.getItem('manager_id');
    //if we have a token, consider the user to be signed in
    if (token) {
        //update application state
        store.dispatch({ type: AUTH_USER });
    }
    if (managerId) {
        store.dispatch({type: ID_USER, payload: managerId })
    }
    if (ownerToken) {
        store.dispatch({ type: AUTH_OWNER })
    }

    store.subscribe(()=> {
        saveState(store.getState());
    });

    return store;
}

export default configureStore;