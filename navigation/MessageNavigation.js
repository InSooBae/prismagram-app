import { createStackNavigator } from 'react-navigation-stack';
import Message from '../screens/Messages/Message';
import Messages from '../screens/Messages/Messages';
import { stackStyles } from './config';

export default createStackNavigator(
  {
    Messages,
    Message
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        ...stackStyles
      }
    }
  }
);
