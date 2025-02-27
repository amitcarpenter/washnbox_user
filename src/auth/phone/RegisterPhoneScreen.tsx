import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {COLORS, IMAGES} from '../../constant/constant';
import Button from '../../component/button/Button';
import Input from '../../component/input/Input';
import Container from '../../component/view/Container';
import {useNavigation} from '@react-navigation/native';
import PhoneInput from 'react-native-phone-number-input';
import {makePostApiCall} from '../../utils/helper';
import {PROVIDER_URLS} from '../../utils/config';
import {useDispatch, UseDispatch, useSelector} from 'react-redux';
import {addLoginData} from '../../redux/dataSlice';
import {check} from '../../config';
import ActivityIndicter from '../../component/activityIndicator';
import CheckBox from 'react-native-check-box';

let isChecked1 = false;
const RegisterPhoneScreen = () => {
  const navigation = useNavigation();
  const phoneInput = useRef<PhoneInput>(null);
  const savedNumber =
    useSelector((state: any) => state?.loginData?.number) || '';
  const savedFormattedValue =
    useSelector((state: any) => state?.loginData?.formattedValue) || '';
  const [value, setValue] = useState(savedNumber);
  const [loading, setLoading] = useState(false); 
  const [formattedValue, setFormattedValue] = useState(savedFormattedValue);
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);

  const memoizedRegisterNumberPress = useCallback(() => {
    onRegisterNumberPress();
  }, [formattedValue]);

  const validation = () => {
    console.log('isChecked==>>>,', isChecked);
    if (formattedValue == '') {
      Alert.alert('Error', 'Please enter a phone number.');
      return false;
    } else if (!check.phoneNumber.test(formattedValue)) {
      Alert.alert('Error', 'Please enter a valid phone number.');
      return false;
    } else if (isChecked1 === false) {
      Alert.alert('Error', 'Please agree to the terms and conditions.');
      return false;
    } else {
      return true;
    }
  };

  console.log('isChecked=>', isChecked);

  const onRegisterNumberPress = async () => {
    let formattedNum = formattedValue;
    if (validation()) {
      setLoading(true);
      let data = {mobile_number: formattedNum};
      let url = PROVIDER_URLS.LOGIN_WITH_NUMBER;
      let response = await makePostApiCall(url, data);
      setLoading(false);
      await checkResponse(response);
    }
  };

  const checkResponse = async (response: any) => {
    // response?.success
    console.log('response=>', response);
    if (true) {
      dispatch(
        addLoginData({
          number: value,
          formattedValue: formattedValue,
          ...response,
        }),
      );
      navigation.navigate('OtpScreen' as never);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Container containerStyle={{flex: 1}}>
        <View style={styles.inner}>
          <View style={styles.topSection}>
            <Image
              source={IMAGES.laundry_service}
              style={styles.laundryImage}
            />
            <Image source={IMAGES.logo} style={styles.logo} />
            <Text style={styles.title}>Let’s get started</Text>
            <Text style={styles.subtitle}>
              Create an account to start ordering
            </Text>
          </View>

          <View style={styles.bottomSection}>
            <Text style={styles.labelStyle}>Your Phone number</Text>
            <PhoneInput
              ref={phoneInput}
              defaultValue={value}
              defaultCode="IN"
              layout="second"
              placeholder="Phone number"
              containerStyle={styles.phoneInputStyle}
              onChangeText={text => {
                setValue(text);
              }}
              onChangeFormattedText={text => {
                setFormattedValue(text);
              }}
              textInputStyle={{
                padding: 0,
                margin: 0,
                marginTop: 0,
                fontSize: 16,
                fontWeight: '500',
                color: COLORS.black,
              }}
              codeTextStyle={{
                padding: 0,
                margin: 0,
              }}
              textContainerStyle={{
                backgroundColor: 'white',
                flex: 1,
              }}
            />

            <View style={styles.checkContainer}>
              <CheckBox
                onClick={() => {
                  isChecked1 = !isChecked1;
                  setIsChecked(!isChecked);
                }}
                isChecked={isChecked}
                rightText=" "
                checkBoxColor={COLORS.primary}
              />
              <Text style={styles.termsText}>
                By pressing “Continue”, you are agreeing to our {'\n'}
                <Text style={styles.termsLink}>Terms and Conditions</Text>
              </Text>
            </View>

            <Button title="Continue" onPress={memoizedRegisterNumberPress} />
          </View>
        </View>
      </Container>
      {loading && <ActivityIndicter show={loading} />}
    </View>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    color: 'black',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  phoneInputStyle: {
    width: '100%',
    height: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    paddingRight: 8,
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
  },
  scrollViewContent: {
    minHeight: '100%',
  },
  inner: {
    minHeight: '100%',
  },
  topSection: {
    minHeight: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  laundryImage: {
    width: '80%',
    height: 29,
    resizeMode: 'contain',
  },
  logo: {
    width: '70%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    color: COLORS.primary,
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.black,
    marginTop: 16,
    textAlign: 'center',
  },
  bottomSection: {
    minHeight: '50%',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  termsText: {
    fontSize: 16,
    color: '#949494',

    lineHeight: 20,
    textAlign: 'left',
  },
  termsLink: {
    fontWeight: '700',
    color: COLORS.primary,
  },
  checkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 5,
  },
});

export default RegisterPhoneScreen;
