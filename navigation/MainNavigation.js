import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import TabNavigation from './TabNavigation';
import PhotoNavigation from './PhotoNavigation';
import MessageNavigation from './MessageNavigation';
import { stackStyles } from './config';

//TabNavigation이 MainNavigation의 자식이 됨
//MainNavigation도 stackNavigtor라서 다른 헤더를 가지고있음 이게 밖에있는 PhotoNavigation의 header
const MainNavigation = createStackNavigator(
  {
    PhotoNavigation,
    TabNavigation,
    MessageNavigation
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        ...stackStyles
      }
    },
    headerMode: 'none',
    mode: 'modal'
  }
);

export default createAppContainer(MainNavigation);
