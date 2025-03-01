import axios from 'axios';
import {BASE_URL, GOOGLE_KEY} from './config';
import {ProfileDataType} from './type';
import {Alert} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {GeolocationError} from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const makePostApiCall = async (
  url: string,
  data: any,
  isFormData = false,
  token = '',
) => {
  console.log('working...');

  try {
    const headers = isFormData
      ? {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        }
      : {'Content-Type': 'application/json', Authorization: `Bearer ${token}`};

    console.log(`
        URL: ${url} Payload: ${data}token:${token}
    `);

    const response = await axios.post(`${BASE_URL + url}`, data, {headers});

    return {
      isLoading: false,
      result: response.data,
      success: true,
    };
  } catch (error: any) {
    if (error.response) {
      console.log('Response Error:', error.response.data);
      Alert.alert('Failed', error.response.data.message, [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
    } else if (error.request) {
      console.log('Request Error:', error.request);
      Alert.alert('Failed', error.response.data.message, [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
    } else {
      console.log('Error Message:', error.message);
      Alert.alert('Failed', error.response.data.message, [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
    }

    return {
      isLoading: false,
      result: error,
      success: false,
    };
  }
};

export const makeGetApiCall = async (url: string, token: string) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${BASE_URL + url}`, {headers});
    console.log(`
            URL: ${url} \n
            Response: ${response.data}
        `);

    return {
      isLoading: false,
      result: response.data,
      success: true,
    };
  } catch (error) {
    console.log(`
            URL: ${url} \n
            Error: ${error}
        `);

    return {
      isLoading: false,
      result: error,
      success: false,
    };
  }
};

export const getUserToken = async () => {
  try {
    let token: string = await AsyncStorage.getItem('loginData').then(
      resp => JSON.parse(resp).result.data,
    );
    return token;
  } catch (error) {
    console.log(`
            TOKEN:
            Error => ${error}
            `);
    return '';
  }
};
export const getAddressFromCoordinates = async (lat: string, lng: string) => {
  const apiKey = GOOGLE_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK') {
      const address = data.results[0].formatted_address;
      console.log(`
            Address ==== ${address}
        `);
      return address;
    } else {
      console.log(`
            Error fetching address : ${data.error_message}
        `);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const checkIsDataValid = async (data: ProfileDataType) => {
  let {name, shop_name, email, phone, services, upi_id, address} = data;

  if (!name) return {isDeatilsValid: false, error: 'Name is required'};
  const formattedName = name.trim().replace(/\s+/g, ' ');
  if (formattedName.length < 2) {
    return {isDeatilsValid: false, error: 'Name must be at least 2 characters'};
  }
  return {isDeatilsValid: true};
};

export const getLocationCoordinates = () => {
  Geolocation.requestAuthorization();
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      success => {
        //   console.log("Location coords ===>", success.coords);
        resolve(success.coords);
      },
      error => {
        let errorMessage = '';
        switch (error.code) {
          case 1:
            errorMessage = 'Location permission denied.';
            break;
          case 2:
            errorMessage = 'Location position unavailable.';
            break;
          case 3:
            errorMessage = 'Location request timed out.';
            break;
          default:
            errorMessage = 'An unknown error occurred.';
        }
        Alert.alert('Location Error', errorMessage);
        reject(error);
      },
      // {enableHighAccuracy: true, timeout: 30000, maximumAge: 10000},
    );
  });
};

export const renderAlertBox = (data: any) => {
  Alert.alert('Error', data, [
    {
      text: 'OK',
      onPress: () => {},
    },
  ]);
};
