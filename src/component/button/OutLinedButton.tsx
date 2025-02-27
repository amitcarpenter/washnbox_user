import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewProps, ViewStyle } from 'react-native'
import React from 'react'
import { COLORS } from '../../constant/constant'

type Props = {
  style?:StyleProp<ViewStyle>
  onPress?:()=>void;
  title?:string
  disabled?:boolean
}
const OutLinedButton = (props:Props) => {
  return (
    <TouchableOpacity disabled={props.disabled} activeOpacity={0.8} onPress={props.onPress} style={[styles.buttonStyle,props.style]}>
      <Text style={styles.buttonTitleStyle}>{props.title || "Continue"}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonStyle:{
    width:"98%",
    minHeight:60,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:10,
    alignSelf:"center",
    borderWidth:1,
    borderColor:COLORS.primary,
    marginVertical:15
  },
  buttonTitleStyle:{
    fontSize:17,
    color:COLORS.primary,
    fontWeight:"600",
  }
})

export default OutLinedButton