import { GET_DECKS, ADD_DECK, GET_DECK } from '../actions'
import { combineReducers } from 'redux';

function decks (state = {}, action) {

    switch (action.type) {

        case GET_DECK:
          return [action.deck]

        case GET_DECKS:
          return action.decks

        case ADD_DECK :
            return {
            ...state,
                [action.title]: {
                title:action.title,
                questions: []
                }
            }

        default :
            return state
    }
}

export default combineReducers({
    decks: decks
  });
