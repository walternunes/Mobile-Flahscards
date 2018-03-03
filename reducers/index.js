import { GET_DECKS } from '../actions'
import { combineReducers } from 'redux';
const INIT_DATA = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
}
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
