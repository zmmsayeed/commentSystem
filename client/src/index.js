import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './App';
import * as serviceWorker from './serviceWorker'

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import storage from 'redux-persist/lib/storage'

import { logger } from 'redux-logger'

import rootReducer from './reducers/index';
import rootSaga from './sagas/index';

import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

const LOCAL_STORAGE_NAME = "CommentApp"

const persistConfig = {
    key: LOCAL_STORAGE_NAME,
    storage,
    stateReconciler: hardSet,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const sagaMiddleware = createSagaMiddleware();

let middleware = [sagaMiddleware]

console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === "development") {
    middleware = [...middleware, logger]
}
export const store = createStore(
    persistedReducer,
    applyMiddleware(...middleware),
)

// export const store = createStore(
//     persistedReducer,
//     applyMiddleware(sagaMiddleware),
// )

export const persistor = persistStore(store)
persistor.persist()
sagaMiddleware.run(rootSaga)


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate loading={true} persistor={persistor}>
                <App />
            </PersistGate>

        </Provider>
    </BrowserRouter>,
    document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
