import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/function/throttle';
import promise from 'redux-promise';
//import App from './components/app';

const addLoggingToDispatch = (store) => {
    const rawDispatch = store.dispatch;
    if (!console.group) {
        return rawDispatch;
    }
    return (action) => {
        console.group(action.type);
        console.log('%c prev state', 'color: gray', store.getState());
        console.log('%c action', 'color: blue', action);
        const returnValue = rawDispatch(action);
        console.log('%c next state', 'color: green', store.getState());
        console.groupEnd(action.type);
        return returnValue;
    };
}

const configureStore = () => {
    const persistedState = loadState();
    const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
    const store = createStoreWithMiddleware(reducers, persistedState);

    //if (process.env.NODE_ENV !== 'production') {
      //  store.dispatch = addLoggingToDispatch(store);
    //}
    

    store.subscribe(throttle(()=> {
        saveState(store.getState());
    }, 100));

    return store;
}

export default configureStore;