import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../../constant/constant'
import BackButton from '../back_button/BackButton'
import { useNavigation } from '@react-navigation/native'

type Props = {
  title:string
  isFilter?:boolean,
  onBackPress?:()=>void
  onFilterPress?:()=>void,
  renderComponent?:React.JSX.Element
}
const Header = (props:Props) => {
  const naviagtion = useNavigation()
  const goBack = () =>{
    naviagtion.goBack()
  }
  return (
    <View style={styles.container}>

      {!props.isFilter && <BackButton onPress={()=>naviagtion.goBack()} />}

      <Text style={styles.headerTextStyle}>{props.title}</Text>
      
      {!props.renderComponent && <BackButton onPress={props.onFilterPress}  isFilter={props.isFilter} />}

      {props.renderComponent}
      
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
      width:"100%",
      height:52,
      justifyContent:"center",
      alignItems:"center",
      marginTop:20,
      flexDirection:"row"
    },
    headerTextStyle:{
        fontSize:24,
        color:COLORS.black,
        fontWeight:"700"
    }
})
export default Header