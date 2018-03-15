import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated   } from 'react-native'
import { connect } from 'react-redux'
import { getDeck } from '../actions'
import { darkGreen, orange, blue, white, lightGray } from '../utils/colors'

function AddQuestionBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={ styles.addBtn }
      onPress={ onPress }>
        <Text style={ styles.addBtnText }>Add question</Text>
    </TouchableOpacity>
  )
}

function StartQuizBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={ styles.startBtn }
      onPress={ onPress }>
        <Text style={ styles.startBtnText }>Start quiz</Text>
    </TouchableOpacity>
  )
}

class DeckDetail extends Component {
  state = {
        slideAnim: new Animated.Value(1000)
    }

    componentDidMount() {
        Animated.timing(
            this.state.slideAnim,
            {
                toValue: 0,
                duration: 1000
            }
        ).start()
    }

  static navigationOptions = ({navigation }) => {
    return {title: navigation.state.params.deck.title}
  }

  refresh(returnDeck) {
     this.props.navigation.setParams({deck: returnDeck})
  }

  render() {
    let { slideAnim } = this.state
    const { deck } = this.props

    return (
      <Animated.View style={{
                ...this.props.style,transform: [
              {
                translateX: slideAnim
              }
            ]
            }}  >
        <View style={styles.item}>
          <View style={styles.deckItem} >
            <Text style={styles.deckItemTitle}>{deck.title}</Text>
            <Text> {deck.questions.length} { deck.questions.length !== 1 ? "questions" : "question"} </Text>
          </View>
          { deck.questions.length > 0 && (
            <StartQuizBtn onPress={() => {
              this.props.navigation.navigate(
                'Quiz',
                { deck: deck }
              )}} />
          )}
          <AddQuestionBtn onPress={() => {
              this.props.navigation.navigate(
                'AddQuestion',
                {  onGoBack: (returnDeck) => this.props.navigation.setParams({deck: returnDeck}), deck: deck }
              )}} />
        </View>
    </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  addBtn: {
    backgroundColor: darkGreen,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginTop: 10,
    marginLeft: 40,
    marginRight: 40,
  },
  addBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  startBtn: {
    backgroundColor: orange,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginTop: 10,
    marginLeft: 40,
    marginRight: 40,
  },
  startBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  item: {
    borderRadius:  2,
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
  deckItem: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightGray,
    height: 125,
    borderRadius: 10,
    marginTop: 10
  },deckItemTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  }
})
function mapStateToProps (state, { navigation }) {
  const { deck } = navigation.state.params
  return { deck }
}


  export default connect(
    mapStateToProps,
    {getDeck}
  )(DeckDetail)
