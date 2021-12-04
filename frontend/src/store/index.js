import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import postReducer from './reducers/postReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  users: userReducer,
  posts: postReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store