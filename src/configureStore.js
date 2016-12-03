    import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/function/throttle';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

const configureStore = () => {
    const logger = createLogger();
    const persistedState = loadState();
    const createStoreWithMiddleware = applyMiddleware(thunk, promise, logger)(createStore);
    const store = createStoreWithMiddleware(reducers);

    store.subscribe(()=> {
        saveState(store.getState());
    });

    return store;
}

export default configureStore;