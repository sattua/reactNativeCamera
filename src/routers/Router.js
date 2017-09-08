import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import MyList from '../components/list/List';
import Profile from '../components/profile/Profile';
import ImportProfiles from '../components/profile/ImportProfiles';
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
    },
    ImportProfiles: {
        screen: ImportProfiles,
        navigationOptions: {
            tabBarLabel: 'Import',
        },
    }
},{
  initialRouteName: 'MyList',
  tabBarPosition: 'top',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
    style: {
        backgroundColor: '#438eff',
      },
  },
});

