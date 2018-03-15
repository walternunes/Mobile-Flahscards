import { INIT_DATA } from '../utils/data'
import { AsyncStorage } from 'react-native'

const INDEX_KEY = 'mobileflashcards'

export function fetchDecks () {
    return AsyncStorage.getItem(INDEX_KEY)
        .then(getAllDecks)
  }

export function addNewDeck (title) {
    return AsyncStorage.mergeItem(INDEX_KEY, JSON.stringify({
        [title]: {title: title, questions: []}
    }))
}

export function addNewQuestion (title, question) {
    return AsyncStorage.mergeItem(INDEX_KEY, JSON.stringify({
        [title]: { questions: question }
    }))
}

export function getDeckById (title) {
    return fetchDecks()
      .then((deck) => deck[title])
  }

function getAllDecks (items) {
    if (items === null){
        // In case of empty storage add the Initial data into storage and return it
        return addInitialData()
    } else {
        return JSON.parse(items)
    }
}

function addInitialData () {
    AsyncStorage.setItem(INDEX_KEY, JSON.stringify(INIT_DATA))
    return INIT_DATA
}
