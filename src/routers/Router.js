import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import MyList from '../components/list/List';
import Profile from '../components/profile/Profile';
import MyCamera from '../components/camera/MyCamera';
import ProfileCard from '../components/card/ProfileCard';

const profileCardNav = StackNavigator({
    MyList: { screen: MyList },
    ProfileCard: { screen: ProfileCard },
  }, {
    initialRouteName: 'MyList',
  });

export default TabNav = TabNavigator({
    MyList: {
        screen: profileCardNav,
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

