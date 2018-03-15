import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar  } from 'react-native';
import { TabNavigator, StackNavigator  } from 'react-navigation'
import { darkGreen, white } from './utils/colors'
import { createStore, applyMiddleware  } from 'redux'
import reducer from './reducers'
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import DeckList from './components/DeckList'
import AddQuestion from './components/AddQuestion'
import Quiz from './components/Quiz'
import DeckDetail from './components/DeckDetail'
import AddDeck from './components/AddDeck'
import { Constants } from 'expo'
import { setLocalNotification } from './utils/helper'

function FlashCardStatusBar (backgroundColor) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} />
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
    header: FlashCardStatusBar(darkGreen)
  },
  tabBarOptions: {
    activeTintColor: white,
    style: {
      height: 56,
      backgroundColor: darkGreen,
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


const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: darkGreen,
      }
    }
  },
  AddQuestion: {
    screen: AddQuestion,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: darkGreen,
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: darkGreen,
      }
    }
  },
})

export default class App extends React.Component {

  componentDidMount() {
      setLocalNotification()
  }

  render() {
    const store = createStore(reducer, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <MainNavigator />
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
