
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

export const GET_DECKS = 'get_decks';

export function getDecks () {
  return dispatch => {
           dispatch( {type: GET_DECKS, decks: INIT_DATA })
  }
 }
