import { View, Text, Image } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/home/HomeScreen';
import OrderScreen from '../../screens/orders/OrderScreen';
import ChatScreen from '../../screens/chat/ChatScreen';
import ProfileScreen from '../../screens/profile/ProfileScreen';
import { COLORS, ICONS } from '../../constant/constant';
import OrderDetails from '../../screens/orders/OrderDetails';
import EditScreen from '../../screens/edit/EditScreen';
import VerndorDetailScreen from '../../screens/vendor/VerndorDetailScreen';

const Tab = createBottomTabNavigator();

const getTabIcon = (focused, activeIcon, inactiveIcon) => {
  return (
    <View style={{
      width:44,
      height:36,
      borderRadius:50,
      justifyContent:"center",
      alignItems:"center",
      backgroundColor: focused? COLORS.primary : COLORS.white
      }}>
      <Image
        source={focused ? activeIcon : inactiveIcon}
        style={{
          width: 24,
          height: 24,
        }}
        resizeMode="contain"
      />
    </View>
  );
};

const TabNavigation = () => {
  const tabConfig = {
    tabBarHideOnKeyboard:true,
    tabBarStyle: {
      height: 80,
      borderTopLeftRadius: 14,
      borderTopRightRadius: 14,
      paddingTop: 10,
      elevation: 10, // For Android shadow effect
      backgroundColor: COLORS.white, // Ensure visibility of shadow
      shadowColor: 'black', // Shadow color
      shadowOffset: { width: 10, height: -5 }, // Shadow direction (bottom to top)
      shadowOpacity: 0.1, // Shadow transparency
      shadowRadius: 6, // Blurred effect
    },
    tabBarLabelStyle: {
      fontSize: 14,
      fontWeight: '600',
      marginTop: 10,
    },
    tabBarActiveTintColor: COLORS.primary,
    tabBarInactiveTintColor: COLORS.black,
  }

  return (
    <Tab.Navigator screenOptions={tabConfig}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            getTabIcon(
              focused,
              ICONS.home_w,
              ICONS.home
            ),
        }}
      />

      {/* <Tab.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          title: 'Chat',
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            getTabIcon(
              focused,
              ICONS.chat_w, // Active icon
              ICONS.chat 
            ),
        }}
      /> */}

      <Tab.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{
          title: 'Orders',
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            getTabIcon(
              focused,
              ICONS.order_w, // Active icon
              ICONS.order
            ),
        }}
      />

      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            getTabIcon(
              focused,
              ICONS.profile, // Active icon
              ICONS.profile
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
