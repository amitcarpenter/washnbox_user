import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from './src/constant/constant'
import RootStackNavigation from './src/navigation/stack/RootStackNavigation'
import { Provider } from 'react-redux'
import store from './src/redux/store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NAVIGATE_TO } from './src/utils/config'
import OrderDetails from './src/screens/orders/OrderDetails'
import { NavigationContainer } from '@react-navigation/native'
const App = () => {
  const [screenName, setScreenName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkBoardingScreenVisited();
  }, []);

  const checkBoardingScreenVisited = async () => {
    try {
      const code = await AsyncStorage.getItem("isBordingScreenVisited");
      const isLogined = await AsyncStorage.getItem("isLogined");
      console.log("code = " + code, "isLogined = " + isLogined);
      if (code === "1" && isLogined==="1") {
        setScreenName(NAVIGATE_TO.TAB_NAVIGATION);
      } else if(code === "1") {
        setScreenName(NAVIGATE_TO.ONBOARDIN_SCREEN);
      }
      else{
        
      }
    } catch (error) {
      console.error("AsyncStorage error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderLoadingScreen = () =>{
    return(
      <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:COLORS.white}}>
        <ActivityIndicator color={COLORS.primary} size={"large"} />
      </View>
    )
  }

  if (isLoading) return renderLoadingScreen();

  // <Provider store={store}>
  //     <RootStackNavigation screenName={screenName} />
  //   </Provider>
  return (
    <Provider store={store}>
      <RootStackNavigation screenName={screenName} />
    </Provider>
  );
};

export default App;