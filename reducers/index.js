import { GET_DECKS } from '../actions'
import { combineReducers } from 'redux';

function decks (state = {}, action) {

    switch (action.type) {

        case GET_DECKS :
        return {
            ...action.decks
        }

        default :
            return state
    }
}

export default combineReducers({
    decks: decks
  });
