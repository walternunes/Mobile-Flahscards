import { GET_DECKS, ADD_DECK, ADD_QUESTION, GET_DECK } from '../actions'
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

        case ADD_QUESTION :
              return {
                  ...state,
                  [action.title]: {
                      ...state[action.title],
                      questions: action.questions
                  }
              }

        default :
            return state
    }
}

export default combineReducers({
    decks: decks
  });
