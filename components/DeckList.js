import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, FlatList} from 'react-native'
import { white, lightGray } from '../utils/colors'
import { connect } from 'react-redux'
import { getDecks } from '../actions'


class DeckList extends Component {

  componentWillMount () {
    this.props.getDecks()
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
              'DeckDetail',
              { deck: item.deck }
            )}>
            <View style={styles.deckItem} >
              <Text>{item.title}</Text>
              <Text>
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

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps

      const thisSceneIndex = scene.index
      const width = layout.initWidth

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      })

      return { transform: [ { translateX } ] }
    },
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
  },deckItem: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightGray,
    height: 85,
    borderRadius: 10,
    marginTop: 10,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 1
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
