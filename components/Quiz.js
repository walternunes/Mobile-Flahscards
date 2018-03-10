import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated   } from 'react-native'
import { connect } from 'react-redux'
import { getDeck } from '../actions'
import { purple, orange, blue, white, lightGray, gray, lightPurp } from '../utils/colors'

class Quiz extends Component {
  state = {
    isQuestion: true,
    currentQuestion: 0,
    countCorrect: 0
  };

  static navigationOptions = ({navigation }) => {
    return {title: 'Quiz'}
  }


  render() {
    const { deck } = this.props
    const {currentQuestion, isQuestion } = this.state
        return (
            <View style={styles.item}>
              <View style={styles.deckItem} >
                <View style={styles.deckQuestionView} >
                  <Text>Card { currentQuestion + 1 }/{deck.questions.length}</Text>
                </View>
                <View style={styles.deckDescription} >
                  { isQuestion && (
                    <Text>Question: {deck.questions[currentQuestion].question}</Text>
                  )}
                  { !isQuestion && (
                    <Text>Answer: {deck.questions[currentQuestion].answer}</Text>
                  )}
                </View>
                <View style={styles.deckChangeView} >
                  { isQuestion && (
                    <TouchableOpacity
                      onPress={() => this.setState({ isQuestion: !this.state.isQuestion })}>
                      <Text>Answer</Text>
                    </TouchableOpacity>
                  )}
                  { !isQuestion && (
                    <TouchableOpacity
                      onPress={() => this.setState({ isQuestion: !this.state.isQuestion })}>
                      <Text>Question</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            <Text>B{JSON.stringify(deck)}</Text>
            </View>
        )
      }
  }


const styles = StyleSheet.create({
  addBtn: {
    backgroundColor: purple,
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
    backgroundColor: gray,
    height: 200,
    borderRadius: 10,
  },
  deckDescription: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightGray,
    height: 85,
    padding: 10,
    borderRadius: 10,
    margin: 10
  },
  deckQuestionView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: orange,
    height: 40,
    marginTop: 10
  },
  deckChangeView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: blue,
    height: 20
  }
})

function mapStateToProps (state, { navigation }) {
  const { deck } = navigation.state.params
  return { deck }
}

  export default connect(
    mapStateToProps
  )(Quiz)
