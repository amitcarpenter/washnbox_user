import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS} from '../../constant/constant';
import Header from '../../component/header/Header';
import {OtpInput} from 'react-native-otp-entry';
import Button from '../../component/button/Button';
import Container from '../../component/view/Container';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {makePostApiCall} from '../../utils/helper';
import {PROVIDER_URLS} from '../../utils/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActivityIndicter from '../../component/activityIndicator';
import {check} from '../../config';
import {addLoginData} from '../../redux/dataSlice';

const OtpScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loginData = useSelector((state: any) => state?.loginData);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isDisabled, setIsDisabled] = useState(true);
  const [otp, setOtp] = useState('');
  const otpValue = loginData.result.data || '';
  const otpRef = useRef(null);

  const renderOtpInput = () => {
    return (
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
        onFocus={() => console.log('Focused')}
        onBlur={() => console.log('Blurred')}
        onTextChange={text => setOtp(text)}
        onFilled={text => console.log(`OTP is ${text}`)}
        textInputProps={{accessibilityLabel: 'One-Time Password'}}
        theme={{
          containerStyle: styles.otpContainer,
          pinCodeContainerStyle: styles.pinCodeContainer,
          pinCodeTextStyle: styles.pinCodeText,
          placeholderTextStyle: styles.placeholderText,
          filledPinCodeContainerStyle: styles.filledPinCodeContainer,
        }}
      />
    );
  };

  const handleSendAgain = async () => {
    setLoading(true);
    let data = {mobile_number: loginData.formattedValue};
    let url = PROVIDER_URLS.LOGIN_WITH_NUMBER;
    let response = await makePostApiCall(url, data);
    setTimer(60);
    setIsDisabled(true);
    setLoading(false);
    if (true) {
      dispatch(
        addLoginData({
          number: loginData.number,
          formattedValue: loginData.formattedValue,
          ...response,
        }),
      );
    }
  };

  const validation = () => {
    if (otp == '') {
      Alert.alert('Error', 'Please enter a OTP.');
      return false;
    } else if (!check.otpFour.test(otp)) {
      Alert.alert('Error', 'Please enter a valid OTP.');
      return false;
    } else {
      return true;
    }
  };

  const onSubmitinOtp = async () => {
    if (validation()) {
      let data = {
        mobile_number: loginData.formattedValue,
        otp: otp,
      };
      setLoading(true);
      let url = PROVIDER_URLS.LOGIN_WITH_OTP;
      let response = await makePostApiCall(url, data);
      console.log('response=>', response);

      setLoading(false);
      await checkResponse(response);
    }
  };

  const checkResponse = async (response: any) => {
    if (response?.result?.success == true) {
      await storeToken(response);
      navigation.navigate('ProfileScreen' as never);
    } else {
      Alert.alert('Incorrect OTP', 'Please enter the correct code.', [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
    }
  };

  const storeToken = async (response: any) => {
    let loginData = JSON.stringify(response);
    await AsyncStorage.setItem('isLogined', '1');
    await AsyncStorage.setItem('loginData', loginData);
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsDisabled(false);
    }
  }, [timer]);

  return (
    <View style={{flex: 1}}>
      <Container>
        <Header title="OTP" />
        <View style={styles.content}>
          <Text style={styles.timerText}>
            {timer < 10 ? `00:0${timer}` : `00:${timer}`}
          </Text>
          <Text style={styles.verificationText}>
            Type the verification code {'\n'} we’ve sent you
          </Text>

          {renderOtpInput()}
          <View style={styles.editNumberBox}>
            <Text style={styles.phoneNumber}>{loginData.number} </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('RegisterPhoneScreen' as never)
              }>
              <Text style={styles.editText}> Edit</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleSendAgain} disabled={isDisabled}>
            <Text style={[styles.resendText, isDisabled && {color: '#a8a7a7'}]}>
              Send again
            </Text>
          </TouchableOpacity>

          <Text style={{position: 'absolute', bottom: 160}}>
            {otpValue || 'try again'}
          </Text>
          <Button title="Continue" onPress={onSubmitinOtp} />
        </View>
      </Container>
      {loading && <ActivityIndicter show={loading} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: '100%',
    backgroundColor: COLORS.white,
    padding: 16,
  },
  scrollViewContent: {
    minHeight: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
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
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 28,
  },
  otpContainer: {
    width: '80%',
    marginTop: 20,
  },
  pinCodeContainer: {
    width: 67,
    height: 70,
    borderRadius: 15,
  },
  pinCodeText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 34,
  },
  placeholderText: {
    backgroundColor: 'white',
  },
  filledPinCodeContainer: {
    backgroundColor: COLORS.primary,
  },
  phoneNumber: {
    fontSize: 17,
    color: COLORS.black,
    fontWeight: '700',
    marginTop: 16,
  },
  editText: {
    color: COLORS.primary,
    fontSize: 17,
    fontWeight: '700',
    marginTop: 16,
  },
  resendText: {
    fontSize: 17,
    color: COLORS.primary,
    fontWeight: '700',
    marginTop: 10,
  },
  editNumberBox: {
    flexDirection: 'row',
  },
});

export default OtpScreen;
