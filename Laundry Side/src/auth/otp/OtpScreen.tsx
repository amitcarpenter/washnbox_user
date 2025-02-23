import { View, Text, TouchableWithoutFeedback, ScrollView, Platform, KeyboardAvoidingView, Keyboard, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { COLORS } from '../../constant/constant';
import Header from '../../component/header/Header';
import { OtpInput } from "react-native-otp-entry";
import Button from '../../component/button/Button';
import Container from '../../component/view/Container';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { makePostApiCall } from '../../utils/helper';
import { PROVIDER_URLS } from '../../utils/config';
import AsyncStorage from "@react-native-async-storage/async-storage"
const OtpScreen = () => {

  const navigation = useNavigation()
  const [value, setValue] = useState("")
  const loginData = useSelector(state=>state.data.loginData)
  console.log("otp screen =>",loginData.result.data)

  const otpValue = loginData.result.data || "";  
  const otpRef = useRef(null);

  const renderOtpInput = () =>{
    return(
      <OtpInput
        ref={otpRef}
        numberOfDigits={4}
        focusColor="green"
        autoFocus={false}
        hideStick={true}
        blurOnFilled={true}
        disabled={false}
        type="numeric"
        secureTextEntry={false}
        focusStickBlinkingDuration={500}
        onFocus={() => console.log("Focused")}
        onBlur={() => console.log("Blurred")}
        onTextChange={(text) => console.log(text)}
        onFilled={(text) => console.log(`OTP is ${text}`)}
        textInputProps={{ accessibilityLabel: "One-Time Password" }}
        theme={{
          containerStyle: styles.otpContainer,
          pinCodeContainerStyle: styles.pinCodeContainer,
          pinCodeTextStyle: styles.pinCodeText,
          placeholderTextStyle: styles.placeholderText,
          filledPinCodeContainerStyle: styles.filledPinCodeContainer,
        }}
      />
    )
  }

  const onSubmitinOtp = async () => { 
    let data = {
      "mobile_number" : loginData.formattedValue,
      "otp" : loginData.result.data
    }
    let url = PROVIDER_URLS.LOGIN_WITH_OTP
    let response = await makePostApiCall(url,data)
    await checkResponse(response)
  }

  const checkResponse = async (response:any) => {
        if(response?.success){
          await storeToken(response)
          navigation.navigate("ProfileScreen")
        }else{
          Alert.alert("Failed","Something went wrong",[
            {
              text:"OK",
              onPress:()=>{}
            }
          ])
        }
  }

  const storeToken = async (response:any) =>{
    let loginData = JSON.stringify(response)
    await AsyncStorage.setItem("loginData",loginData)
  }

  return (
        <Container>
          <Header title='OTP' />
          <View style={styles.content}>
            <Text style={styles.timerText}>00:42</Text>
            <Text style={styles.verificationText}>Type the verification code {"\n"} we’ve sent you</Text>

            {renderOtpInput()}
            <Text style={styles.phoneNumber}>{loginData.number} <Text style={styles.editText}> Edit</Text></Text>
            <Text style={styles.resendText}>Send again</Text>

            <Text style={{position:"absolute",bottom:160}}>{otpValue || "try again"}</Text>
            <Button 
              title='Continue' 
              onPress={onSubmitinOtp} 
            />
          </View>
        </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: "100%",
    backgroundColor: COLORS.white,
    padding: 16,
  },
  scrollViewContent: {
    minHeight: "100%",
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
  },
  timerText: {
    fontSize: 36,
    lineHeight: 52,
    fontWeight: '700',
    color: COLORS.black,
    marginVertical: 10,
  },
  verificationText: {
    textAlign: "center",
    fontSize: 18,
    lineHeight: 28,
  },
  otpContainer: {
    width: "80%",
    marginTop: 20,
  },
  pinCodeContainer: {
    width: 67,
    height: 70,
    borderRadius: 15,
  },
  pinCodeText: {
    color: "white",
    fontWeight: "700",
    fontSize: 34,
  },
  placeholderText: {
    backgroundColor: "white",
  },
  filledPinCodeContainer: {
    backgroundColor: COLORS.primary,
  },
  phoneNumber: {
    fontSize: 17,
    color: COLORS.black,
    fontWeight: "700",
    marginTop: 16,
  },
  editText: {
    color: COLORS.primary,
  },
  resendText: {
    fontSize: 17,
    color: COLORS.primary,
    fontWeight: "700",
    marginTop: 10,
  },
});

export default OtpScreen;
