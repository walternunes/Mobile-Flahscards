import { INIT_DATA } from '../utils/data'
 
export const GET_DECKS = 'get_decks';

export function getDecks () {
  return dispatch => {
           dispatch( {type: GET_DECKS, decks: INIT_DATA })
  }
 }
