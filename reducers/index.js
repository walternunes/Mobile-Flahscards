import { GET_DECKS, ADD_DECK, GET_DECK } from '../actions'
import { combineReducers } from 'redux';

function decks (state = {}, action) {

    switch (action.type) {

        case GET_DECKS :
            return {
                ...action.decks
        }

        case GET_DECK :
        return {
            [action.deck.title]: action.deck
        }

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
