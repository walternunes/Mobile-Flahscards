import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar  } from 'react-native';
import { TabNavigator } from 'react-navigation'
import { purple, white } from './utils/colors'
import { createStore, applyMiddleware  } from 'redux'
import reducer from './reducers'
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import { Constants } from 'expo'

function FlashCardStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
 }

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks'
    },
 },
  AddDeck: {
     screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck'
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

export default class App extends React.Component {
  render() {
    const store = createStore(reducer, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <FlashCardStatusBar backgroundColor={purple} barStyle="light-content" />
          <Tabs />
          <Text> ffffdf </Text>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
