import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import TabNavigation from './TabNavigation';
import PhotoNavigation from './PhotoNavigation';

//TabNavigation이 MainNavigation의 자식이 됨
//MainNavigation도 stackNavigtor라서 다른 헤더를 가지고있음 이게 밖에있는 PhotoNavigation의 header
const MainNavigation = createStackNavigator(
  {
    TabNavigation,
    PhotoNavigation
  },
  {
    headerMode: 'none',
    mode: 'modal'
  }
);

export default createAppContainer(MainNavigation);
