import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS, ICONS, IMAGES } from '../../constant/constant';
import { useNavigation } from '@react-navigation/native';


type Props = {
  isFilter?:boolean,
  onPress?:()=>void
}
const BackButton = (props:Props) => {

  const navigation = useNavigation()

  const onBackPress = () =>{
    navigation.goBack()
  }
  return (
    <>
    {props.isFilter?(
      <TouchableOpacity onPress={props.onPress} style={props.isFilter?styles.filterButton:styles.button}>
        <Image source={ICONS.filter} style={styles.filterImageStyle} />
      </TouchableOpacity>
    ):
      <TouchableOpacity onPress={onBackPress} style={props.isFilter?styles.filterButton:styles.button}>
        <Image source={IMAGES.back_icon} style={styles.image} />
      </TouchableOpacity>
    }
    </>
   
  );
};

const styles = StyleSheet.create({
  button: {
    width: 54,
    height: 52,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    position: 'absolute',
    left: 0,
  },
  filterButton: {
    width: 54,
    height: 52,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    position: 'absolute',
    right: 0,
  },
  image: {
    width: 10,
    height: 14,
    resizeMode:"contain"
  },
  filterImageStyle:{
    width: 24,
    height: 24,
    resizeMode:"contain"
  }
});

export default BackButton;
