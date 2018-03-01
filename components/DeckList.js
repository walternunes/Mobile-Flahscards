import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, FlatList} from 'react-native'
import { white } from '../utils/colors'
import { INIT_DATA } from '../utils/data'


class DeckList extends Component {
  state = {
    ready: false,
  }

  renderDeck = ({element}) => (
    <TouchableOpacity
      onPress={() => this.props.navigation.navigate(
        'DeckList',
        { deck: element.deck, id: element.key }
    )}>
      <View style={styles.deckTile} >
        <Text style={styles.deckTitle} >{element.title}</Text>
        <Text style={styles.numCards}>
          {element.questions.length} { element.questions.length !== 1
          ? "quizzie questions"
          : "quizzie question"}
        </Text>
      </View>
    </TouchableOpacity>
  )

  render() {
    const deckList = INIT_DATA;
    return (
      <View style={styles.item}>
        <Text>->{deckList.React.title}</Text>
        <FlatList
          data={deckList}
          renderItem={this.renderDeck}
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
export default DeckList;
