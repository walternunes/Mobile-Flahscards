import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { getDeck } from '../actions'

class DeckDetail extends Component {
  static navigationOptions = ({navigation }) => {
    return {title: navigation.state.params.deck.title}
  }


  render() {
    const { deck } = this.props

    return (
      <View>
        <Text>B{JSON.stringify(deck)}</Text>
      </View>
    )
  }
}


function mapStateToProps (state, { navigation }) {
  const { deck, id } = navigation.state.params
  return { deck, id }
}


  export default connect(
    mapStateToProps,
    {getDeck}
  )(DeckDetail)
