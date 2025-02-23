import { 
    View, KeyboardAvoidingView, TouchableWithoutFeedback, 
    Keyboard, Platform, ScrollView, StyleSheet, StyleProp, ViewStyle 
} from 'react-native'
import React, { ReactNode } from 'react'
import { COLORS } from '../../constant/constant'

type Props = {
    children: ReactNode,
    containerStyle?: StyleProp<ViewStyle>
}

const Container = (props: Props) => {
  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={[styles.container, props.containerStyle]}
    >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
                // scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContent} 
                keyboardShouldPersistTaps="handled"
            >
                {props.children}
            </ScrollView>
         </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.white,
        padding: 16
    },
    scrollViewContent: {
        minHeight:"100%"
    },
})

export default Container;
