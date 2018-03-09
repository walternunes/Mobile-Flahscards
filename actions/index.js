import { INIT_DATA } from '../utils/data'
import { fetchDecks, addNewDeck, addNewQuestion, getDeckById } from '../utils/api'

export const GET_DECKS = 'get_decks';
export const GET_DECK = 'get_deck';
export const ADD_DECK = 'add_deck';
export const ADD_QUESTION = 'add_question';

export function getDecks () {
    return dispatch => {
        fetchDecks()
            .then(response => dispatch({type: GET_DECKS, decks: response}));
    }
 }

export function getDeck (title) {
    return dispatch => {
        getDeckById(title)
            .then(response => dispatch({type: GET_DECK, deck: response}));
    }
 }

 export function addDeck (title) {
    return dispatch => {
        addNewDeck(title)
            .then((response) => dispatch({type: ADD_DECK, title: title}));
    }
 }

 export function addQuestion (title, question) {
    return dispatch => {
        addNewQuestion(title, question)
            .then((response) => dispatch({type: ADD_QUESTION, title: title, questions: question}));
    }
 }
