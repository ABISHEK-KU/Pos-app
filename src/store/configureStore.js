import customerReducer from '../reducers/customerReducer'
import userReducer from '../reducers/userReducer'
import productReducer from '../reducers/productReducer'
import billReducer from '../reducers/billReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const configureStore = () => {
    const store = createStore(combineReducers({
        user: userReducer,
        customer: customerReducer,
        product: productReducer,
        bill: billReducer,
    }), applyMiddleware(thunk));
    return store
}
export default configureStore