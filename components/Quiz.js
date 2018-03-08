import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class Quiz extends Component {
  static navigationOptions = ({navigation }) => {
    return {title: 'Quiz'}
  }



  render() {

    return (
      <View>
        <Text>This is a quiz</Text>

      </View>
    )
  }
}
/*
function mapStateToProps (state, { navigation }) {
  const { deck, id } = navigation.state.params
  return { deck, id }
}


  export default connect(
    mapStateToProps,
    {getDeck}
  )(DeckDetail)
*/

export default Quiz
