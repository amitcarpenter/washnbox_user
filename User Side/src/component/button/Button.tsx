import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewProps, ViewStyle, TextStyle } from 'react-native'
import React from 'react'
import { COLORS } from '../../constant/constant'

type Props = {
  style?:StyleProp<ViewStyle>
  onPress?:()=>void;
  title?:string,
  titleStyle?:StyleProp<TextStyle>,
  disabled?:boolean
}
const Button = (props:Props) => {
  return (
    <TouchableOpacity disabled={props.disabled} onPress={props.onPress} style={[styles.buttonStyle,props.style]}>
      <Text style={[styles.buttonTitleStyle,props.titleStyle]}>{props.title || "Continue"}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonStyle:{
    width:"98%",
    minHeight:60,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:COLORS.primary,
    borderRadius:100,
    alignSelf:"center",
    position:"absolute",
    bottom:10
  },
  buttonTitleStyle:{
    fontSize:17,
    color:COLORS.white,
    fontWeight:"600",
  }
})

export default Button