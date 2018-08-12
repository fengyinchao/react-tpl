import { createStore, applyMiddleware, compose } from 'redux'
// import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import rootReducer from 'store/reducers'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const initialState = {
  joke: []
}

let store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(promiseMiddleware))
)

export default store