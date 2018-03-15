import React, { Component } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Platform, Alert } from 'react-native'
import { connect } from 'react-redux'
import { addQuestion } from '../actions'
import { white, darkGreen, black, lightGray, gray } from '../utils/colors'

function AddQuestionBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={ styles.addBtn }
      onPress={ onPress }>
        <Text style={ styles.addBtnText }>Add Question</Text>
    </TouchableOpacity>
  )
}
class AddQuestion extends Component {
  state = {
    question: "",
    answer: ""
  }

  static navigationOptions = ({navigation }) => {
    return {title: "Add new question"}
  }

  updateQuestionText = (question) => {
    this.setState({
      question: question
    })
  }

  updateAnswerText = (answer) => {
    this.setState({
      answer: answer
    })
  }

  submit = () => {
    const { deck } = this.props
    const questionText = this.state.question
    const answerText = this.state.answer
    const questionAnswer = {
      question: questionText,
      answer: answerText
    }

    if(questionText.trim().length === 0){
      Alert.alert("Invalid question", "The question must have at least one letter")
    } else if (answerText.trim().length === 0) {
      Alert.alert("Invalid answer", "The answer must have at least one letter")
    } else {
      deck.questions.push(questionAnswer)
      this.props.addQuestion(deck.title, deck.questions)
      this.setState({
          question: "",
          answer: ""
      })

      this.questionInput.clear()
      this.answerInput.clear()
      this.props.navigation.state.params.onGoBack(deck);
      this.props.navigation.goBack()
    }
  }

  render() {
    const { deck } = this.props
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.item}>
        <Text style={styles.addQuestionText} > Question & Answer ?</Text>
        <TextInput
              underlineColorAndroid = "transparent"
              placeholder = "Question"
              placeholderTextColor={ gray }
              style = { styles.inputText }
              numberOfLines = {2}
              onChangeText = { this.updateQuestionText }
              ref={ questionInput => { this.questionInput = questionInput }}
        />
        <TextInput
              underlineColorAndroid = "transparent"
              placeholder = "Answer"
              placeholderTextColor={ gray }
              style = { styles.inputText }
              numberOfLines = {3}
              onChangeText = { this.updateAnswerText }
              ref={ answerInput => { this.answerInput = answerInput }}
        />
        <AddQuestionBtn onPress={this.submit} />
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
  addQuestionText: {
    fontSize: 20,
    textAlign: 'center',
  },
  inputText: {
    color: black,
    backgroundColor: lightGray,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    marginLeft: 50,
    marginRight: 50,
 }
})


function mapStateToProps (state, { navigation }) {
  const questions = state.questions;
  const { deck } = navigation.state.params
  return { questions, deck };
};


export default connect(
  mapStateToProps,
  {addQuestion}
)(AddQuestion)
