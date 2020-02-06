import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from '../screens/Home';
import Notifications from '../screens/Notifications';
import Profile from '../screens/Profile';
import Search from '../screens/Search';
import MessagesLink from '../components/MessagesLink';
import { View } from 'react-native';

//TabNavigator에 각 탭마다 StackNavigator효과를 주는일 customconfig에는설정들
const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator({
    InitialRoute: {
      screen: initialRoute,
      navigationOptions: { ...customConfig }
    }
  });

export default createBottomTabNavigator({
  Home: {
    screen: stackFactory(Home, {
      title: 'Home',
      headerRight: () => <MessagesLink />
    })
  },
  Search: {
    screen: stackFactory(Search, { title: 'Search ' })
  },
  Add: {
    screen: View,
    navigationOptions: {
      tabBarOnPress: ({ navigation }) => navigation.navigate('PhotoNavigation')
    }
  },
  Notifications: {
    screen: stackFactory(Notifications, { title: 'Notifications' })
  },
  Profile: {
    screen: stackFactory(Profile, { title: 'Profile' })
  }
});
