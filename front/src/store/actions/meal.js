import { MEAL_ADD } from './actionTypes'

export const mealAdd = meal => {
    return {
        type: MEAL_ADD,
        payload: meal
    }
}
