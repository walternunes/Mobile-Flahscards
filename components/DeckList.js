import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, FlatList} from 'react-native'
import { white } from '../utils/colors'
import { connect } from 'react-redux'
import { INIT_DATA } from '../utils/data'
import { fetchDecks } from '../utils/api'
import { getDecks } from '../actions'


class DeckList extends Component {
  state = {
    ready: false,
  }

  componentDidMount () {
    this.props.getDecks()
   // .then((decks) =>  console.log)
  }

  render() {
    const { decks } = this.props
    const deckList = Object.keys(decks).map(function(deckId) {

      return { key: deckId,
               deck: decks[deckId],
               title: decks[deckId].title,
               questions: decks[deckId].questions
             }
    })

    return (
      <View style={styles.item}>
        <Text>{JSON.stringify(decks)}</Text>
        <FlatList
          data={deckList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate(
              'DeckList',
              { deck: item.deck, id: item.key }
            )}>
            <View style={styles.deckTile} >
              <Text style={styles.deckTitle} >{item.title}</Text>
              <Text style={styles.numCards}>
                {item.questions.length} { item.questions.length !== 1
                ? "questions"
                : "question"}
              </Text>
            </View>
          </TouchableOpacity>
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
})

const mapStateToProps = state => {
  const decks = state.decks;

  return { decks };
};


export default connect(
  mapStateToProps,
  {getDecks}
)(DeckList)
