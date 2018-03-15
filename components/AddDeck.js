import React, { Component } from 'react'
import { connect } from 'react-redux'
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, Alert } from 'react-native'
import { white, darkGreen, black, gray, lightGray } from '../utils/colors'
import { addDeck } from '../actions'

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
      this.props.addDeck(deckTitle)
      this.setState({title: ""})
      this.textInput.clear()
      Keyboard.dismiss()
      this.props.navigation.navigate(
        'DeckDetail',
        { deck: deck }
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
    borderRadius: 2,
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
    backgroundColor: darkGreen,
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

const mapStateToProps = state => {
  const decks = state.decks;
  return { decks };
};


export default connect(
  mapStateToProps,
  {addDeck}
)(AddDeck)
