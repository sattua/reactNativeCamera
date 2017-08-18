import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import MyList from '../components/list/List';
import Profile from '../components/profile/Profile';
import MyCamera from '../components/camera/MyCamera';

export default TabNav = TabNavigator({
    MyList: {
        screen: MyList,
        navigationOptions: {
        tabBarLabel: 'MyList',
        },
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
        tabBarLabel: 'Profile',
        },
    }
},{
  initialRouteName: 'MyList',
});

