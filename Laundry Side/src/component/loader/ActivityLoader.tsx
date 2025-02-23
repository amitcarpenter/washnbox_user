import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import Modal from "react-native-modal"
import { COLORS } from '../../constant/constant'

interface Props {
    isVisible:boolean
}

const ActivityLoader = ({isVisible}:Props) => {
  return (
    <Modal backdropColor='rgba(255,255,255,0.8)' statusBarTranslucent isVisible={isVisible}>
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <ActivityIndicator color={COLORS.primary} size={"large"} />
        </View>
    </Modal>
  )
}

export default ActivityLoader