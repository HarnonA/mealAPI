import {createStore, combineReducers} from 'redux'
import userReducer from './reducers/user'
import mealReducer from './reducers/meal'

const reducers = combineReducers({
    user: userReducer,
    meal: mealReducer,

})

const storeConfig = () => {
    return createStore(reducers)
}

export default storeConfig;