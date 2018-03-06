import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { getDeck } from '../actions'

class DeckDetail extends Component {
  state = {
    title: "",
  }
  componentDidMount () {
    this.props.getDeck("React")
  }

  render() {
    const { decks } = this.props
    const { deck } = this.props

    return (
      <View>
        <Text>A{JSON.stringify(decks)}</Text>
        <Text>B{JSON.stringify(deck)}</Text>
      </View>
    )
  }
}


const mapStateToProps = state => {
    const deck = state.deck;
    return { deck };
  };


  export default connect(
    mapStateToProps,
    {getDeck}
  )(DeckDetail)
