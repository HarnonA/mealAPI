import { MEAL_ADD } from '../actions/actionTypes'

const initialState = {
    meal: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case MEAL_ADD:
            return {
                ...state,
                meal: action.payload
                
            }
       
        default: return state
    }
}

export default reducer;


