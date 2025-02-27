import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import TabNavigation from '../tab/TabNavigation'
import NotificationScreen from '../../screens/notification/NotificationScreen'
import OnboardingScreen from '../../screens/common/onboarding/OnboardingScreen'
import EditScreen from '../../screens/edit/EditScreen'
import OrderDetails from '../../screens/orders/OrderDetails'
import RegisterPhoneScreen from '../../auth/phone/RegisterPhoneScreen'
import OtpScreen from '../../auth/otp/OtpScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NAVIGATE_TO } from '../../utils/config'
import VerndorDetailScreen from '../../screens/vendor/VerndorDetailScreen'
import OrderDetail from '../../screens/orders/OrderDetail'

const Stack = createStackNavigator()

type Props = {
  screenName:string
}
const RootStackNavigation = (props:Props) => {
  return (
   <NavigationContainer>
    <Stack.Navigator initialRouteName={props.screenName} >
      <Stack.Screen 
        name='OnbordingScreen'
        component={OnboardingScreen}
        options={{headerShown:false}}
      />

      <Stack.Screen 
        name='RegisterPhoneScreen'
        component={RegisterPhoneScreen}
        options={{headerShown:false}}
      />

      <Stack.Screen 
        name='OtpScreen'
        component={OtpScreen}
        options={{headerShown:false}}
      />

      <Stack.Screen 
        name='ProfileScreen'
        component={EditScreen}
        options={{headerShown:false}}
      />

      <Stack.Screen 
        name='TabNavigation' 
        component={TabNavigation} 
        options={{headerShown:false}}
      />

      <Stack.Screen 
        name='NotificationScreen' 
        component={NotificationScreen} 
        options={{headerShown:false}}
      />

      <Stack.Screen 
        name='OrderDetailScreen'
        component={OrderDetails} 
        options={{headerShown:false}}
      />

      <Stack.Screen 
        name='VerndorDetailScreen'
        component={VerndorDetailScreen} 
        options={{headerShown:false}}
      />
      <Stack.Screen 
        name='OrderDetail'
        component={OrderDetail} 
        options={{headerShown:false}}
      />
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default RootStackNavigation