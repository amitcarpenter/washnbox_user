import React, { useRef, useState } from "react";
import { View, Image, Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import Carousel from "react-native-snap-carousel";
import { COLORS, IMAGES, onboardingData, ProjectImage } from "../../../constant/constant";
import { Pagination } from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const images = [
  require("../../../assets/images/one.png"),
  require("../../../assets/images/two.png"),
  require("../../../assets/images/three.png"),
];

const OnboardingScreen = () => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation()

  const goNext = async() => {
    if (carouselRef.current && activeIndex < onboardingData.length - 1) {
      carouselRef?.current?.snapToNext();
    }else if (activeIndex=== onboardingData.length-1) {
      await AsyncStorage.setItem("isBordingScreenVisited","1")
      navigation.navigate("RegisterPhoneScreen")
    }
  };

  const renderItem = ({ item }:{item:any}) => (
    <View style={styles.slide}>
      <View>
        <Image source={item.image} resizeMode="cover" style={styles.image} />
      </View>
      
      <View style={styles.onboardingTextContainer}>
        <Text style={styles.titleStyle}>{item.title}</Text>

        <Text style={styles.subtitleStyle}>{item.subtitle}</Text>

        <Pagination
          dotsLength={onboardingData.length}
          activeDotIndex={activeIndex}
          carouselRef={carouselRef}
          dotStyle={styles.dotstyle}
          inactiveDotStyle={styles.inactiveDotStyle}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
    </View>
  );

  const renderBackgroundImage = () =>{
    const currentIndex = activeIndex 
    switch (currentIndex) {
      case 0:
        return(
          <View>
            <Image style={{width:"90%",height:432}} source={IMAGES.onboarding_background} />
          </View>
        )
      case 1:
       return(
        <View>
          <Image style={{width:"90%",height:300,alignSelf:"flex-end"}} source={IMAGES.onboarding_background2} />
        </View>
        )
      case 2:
        return(
          <View>
            <Image style={{width:"90%",height:300,alignSelf:"flex-end"}} source={IMAGES.onboarding_background3} />
          </View>
        )
    
      default:
        return
    }
  }

  return (
    <View style={{flex:1,backgroundColor:COLORS.white}}>
      {renderBackgroundImage()}

      <View style={{height:"100%",position:"absolute"}}>
        <Carousel
          ref={carouselRef}
          data={onboardingData}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={width * 0.7}
          layout={'default'}
          onSnapToItem={(index) => setActiveIndex(index)}
        />

        <TouchableOpacity onPress={goNext} style={styles.nextButtonStyle}>
          <Image style={{width:25,height:25}} source={IMAGES.right_arrow} />
        </TouchableOpacity>
      </View> 
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex:1,
    justifyContent: "center",
  },
  nextButtonStyle:{
    width:92,
    height:92,
    borderRadius:92,
    backgroundColor:COLORS.primary,
    justifyContent:"center",
    alignItems:"center",
    position:"absolute",
    bottom:16,
    right:16
  },
  image: {
    width: width * 0.7,
    height: height*0.45,
    borderRadius: 10
  },
  dotstyle:{ 
    width: 12, 
    height: 12,
    borderRadius:12, 
    backgroundColor:COLORS.primary,
    marginHorizontal:-4
  },
  inactiveDotStyle:{
    width: 12, 
    height: 12,
    borderRadius:12,
    backgroundColor: 'gray'
  },
  subtitleStyle:{
    textAlign:"center",
    fontSize:14,
    color:"#323755",
    lineHeight:21,
    marginTop:20
  },
  titleStyle:{
    fontSize:24,
    textAlign:"center",
    fontWeight:"700",
    color:COLORS.primary
  },
  onboardingTextContainer:{
    flex:0.5,
    justifyContent:"center",
    alignItems:"center"
  }
});

export default OnboardingScreen;
