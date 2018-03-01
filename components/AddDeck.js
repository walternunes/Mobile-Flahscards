import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native'
import { white, purple, black, gray, lightGray } from '../utils/colors'

function AddDeckBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={ styles.addBtn }
      onPress={ onPress }>
        <Text style={ styles.addBtnText }>Add deck</Text>
    </TouchableOpacity>
  )
}

class AddDeck extends Component {
  state = {
    title: "",
  }

  updateTitle = (title) => {
    this.setState({ title: title })
  }

  submit = () => {
    const deckTitle = this.state.title
    const deck = {
      title: deckTitle,
      questions: []
    }

    if(deckTitle.trim().length === 0){
      Alert.alert("Invalid deck title", "The title must have at least one letter")
    } else {
      /*this.props.dispatch(addDeck(deckTitle))
      addNewDeck(deckTitle)*/

      this.setState({title: ""})
      this.textInput.clear()
      //CHANGE TO DECK VIEW HERE
      this.props.navigation.navigate(
        'DeckList',
        { deck: deck, id: deckTitle }
      )
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.item}>
        <Text style={styles.addDeckText} > What is the title of your new deck ?</Text>
        <TextInput
              underlineColorAndroid = "transparent"
              placeholder = "Deck Title"
              placeholderTextColor={ gray }
              style = { styles.inputText }
              onChangeText = { this.updateTitle }
              ref={ input => { this.textInput = input }}
              />
        <AddDeckBtn onPress={this.submit} />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  addBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  addBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  addDeckText: {
    fontSize: 20,
    textAlign: 'center',
  },
  inputText: {
    color: black,
    backgroundColor: lightGray,
    borderRadius: 10,
    height: 45,
    margin: 10,
    padding: 10,
    marginLeft: 50,
    marginRight: 50,
 }
})
export default AddDeck;
