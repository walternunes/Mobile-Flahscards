import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/colors'

class AddQuestion extends Component {
  state = {
    ready: false,
  }
  render() {
    return (
      <View style={styles.item}>
        <Text >TThis is a quesetion add. </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
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
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
})


const mapStateToProps = state => {
  const questions = state.questions;
  return { questions };
};


export default connect(
  mapStateToProps
)(AddQuestion)
