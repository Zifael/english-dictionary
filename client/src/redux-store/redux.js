import {combineReducers, createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/saga'
import authReducer from './auth-reducer'
import wordReducer from './word-reducer'

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    auth: authReducer,
    word: wordReducer
})

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

export default store