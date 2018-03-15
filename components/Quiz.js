import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated, Dimensions   } from 'react-native'
import { connect } from 'react-redux'
import { getDeck } from '../actions'
import { darkGreen, orange, blue, red, white, lightGray, gray, lightPurp, purple } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helper'

class Quiz extends Component {
  state = {
    isQuestion: true,
    currentQuestion: 0,
    countCorrect: 0
  };

  static navigationOptions = ({navigation }) => {
    return {title: 'Quiz'}
  }

  restartNotification() {
      clearLocalNotification()
        .then(setLocalNotification());
  }

  getQuestionAnswerText = (isQuestion, questionItem) => {
      return isQuestion ? `Question: ${questionItem.question}`:
              `Answer: ${questionItem.answer}`
  }


  render() {
    const { deck } = this.props
    const {currentQuestion, isQuestion } = this.state
        return (
            <View style={styles.item}>
              <View style={styles.deckItem} >
                <View style={styles.cardRow} >
                    <Text style={styles.countTitle}>{currentQuestion === deck.questions.length ? "Your Score" :
                          `Question ${ currentQuestion + 1 }/${deck.questions.length}`}</Text>
                </View>

                <View style={styles.cardDescription} >
                      <Text>{currentQuestion !== deck.questions.length ? this.getQuestionAnswerText(isQuestion, deck.questions[currentQuestion]) :
                             `Your score was ${this.state.countCorrect} out of ${deck.questions.length}`}</Text>
                </View>

                { currentQuestion !== deck.questions.length && (
                  <View style={styles.cardRow} >
                      <TouchableOpacity
                        onPress={() => this.setState({ isQuestion: !this.state.isQuestion })}>
                        <Text style={styles.showAnswerText}>{this.state.isQuestion ? "Show Answer" : "Show Question"}</Text>
                      </TouchableOpacity>
                  </View>
                )}
              </View>

              { currentQuestion !== deck.questions.length && (
                <View style={styles.buttonsView}>
                  <TouchableOpacity
                    onPress={() => this.setState({ currentQuestion: this.state.currentQuestion + 1, countCorrect: this.state.countCorrect + 1, isQuestion: true })}>
                    <View style={styles.blueButton} >
                      <Text style={styles.buttonText}>Correct</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.setState({ currentQuestion: this.state.currentQuestion + 1, isQuestion: true })}>
                    <View style={styles.redButton} >
                      <Text style={styles.buttonText}>Incorrect</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}

              { currentQuestion === deck.questions.length && (
                <View style={styles.buttonsView}>
                  <TouchableOpacity
                    onPress={() => {this.restartNotification(); this.setState({ currentQuestion: 0, countCorrect: 0, isQuestion: true })}}>
                    <View style={styles.blueButton} >
                      <Text style={styles.buttonText}>Restart</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {this.restartNotification(); this.props.navigation.goBack()}}>
                    <View style={styles.redButton} >
                      <Text style={styles.buttonText}>Return</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
        )
      }
  }


  const width = Dimensions.get('window').width

const styles = StyleSheet.create({
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
  cardDescription: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightGray,
    height: 85,
    padding: 10,
    borderRadius: 10,
    margin: 10
  },
  cardRow: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: gray,
    height: 30,
    marginTop: 10
  },
  buttonsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  blueButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: blue,
    margin: 10,
    height: 50,
    width: width * .3
  },
  redButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: red,
    margin: 10,
    height: 50,
    width: width * .3
  },
  countTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  showAnswerText: {
    fontSize: 18,
    color: purple,
    fontWeight: 'bold',
  }
})

function mapStateToProps (state, { navigation }) {
  const { deck } = navigation.state.params
  return { deck }
}

  export default connect(
    mapStateToProps
  )(Quiz)
