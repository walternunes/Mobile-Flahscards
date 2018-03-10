import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated   } from 'react-native'
import { connect } from 'react-redux'
import { getDeck } from '../actions'
import { purple, orange, blue, white } from '../utils/colors'

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

function DeleteDeckBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={ styles.deleteBtn }
      onPress={ onPress }>
        <Text style={ styles.deleteBtnText }>Delete</Text>
    </TouchableOpacity>
  )
}

class DeckDetail extends Component {
  state = {
        fadeAnim: new Animated.Value(1000)
    }

    componentDidMount() {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 0,
                duration: 1000
            }
        ).start()
    }

  static navigationOptions = ({navigation }) => {
    return {title: navigation.state.params.deck.title}
  }

  refresh(test) {
     this.props.navigation.setParams({deck: test})
  }

  render() {
    let { fadeAnim } = this.state
    const { deck } = this.props

    return (
      <Animated.View style={{
                ...this.props.style,transform: [
              {
                translateX: fadeAnim
              }
            ]
            }}  >
        <Text>B{JSON.stringify(deck)}</Text>
        <StartQuizBtn onPress={() => {
          this.props.navigation.navigate(
            'Quiz'
          )}} />
        <AddQuestionBtn onPress={() => {
            this.props.navigation.navigate(
              'AddQuestion',
              {  onGoBack: (returnDeck) => this.props.navigation.setParams({deck: returnDeck}), deck: deck }
            )}} />
        <DeleteDeckBtn onPress={() => {
           this.props.navigation.goBack()}} />
    </Animated.View>
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
  deleteBtn: {
    backgroundColor: blue,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginTop: 10,
    marginLeft: 40,
    marginRight: 40,
  },
  deleteBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
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
