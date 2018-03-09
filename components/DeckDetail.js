import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
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
  static navigationOptions = ({navigation }) => {
    return {title: navigation.state.params.deck.title}
  }



  render() {
    const { deck } = this.props

    return (
      <View>
        <Text>B{JSON.stringify(deck)}</Text>
        <StartQuizBtn onPress={() => {
          this.props.navigation.navigate(
            'Quiz'
          )}} />
        <AddQuestionBtn onPress={() => {
            this.props.navigation.navigate(
              'AddQuestion',
              { deck: deck }
            )}} />
        <DeleteDeckBtn onPress={() => {
           this.props.navigation.goBack()}} />
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
