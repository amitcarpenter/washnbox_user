export const check = {
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
  password:
    /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,16}$/,
  fullName: /^(?=.*[A-Za-z ])[A-Za-z ]{1,}$/,
  otp: /^(?=.*[0-9])[0-9]{6}$/,
  otpFour: /^(?=.*[0-9])[0-9]{4}$/,
  phoneNumber: /^\+?[1-9]\d{10,14}$/,
}; 


import {Dimensions, Platform, StatusBar} from 'react-native';

// Screen Dimensions
const {height: windowHeight, width: windowWidth} = Dimensions.get('window');

// Status bar height
export const STATUS_BAR_HEIGHT =
  Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 20; // Default to 20 for iOS without `getStatusBarHeight`

export const IS_NOTCH = (() => {
  if (Platform.OS === 'ios') {
    return windowHeight / windowWidth > 2;
  }
  if (Platform.OS === 'android') {
    return StatusBar.currentHeight && StatusBar.currentHeight > 24;
  }
  return false;
})();

export const SCREEN_HEIGHT = windowHeight;
export const SCREEN_WIDTH = windowWidth;

export const wp = percent => (SCREEN_WIDTH * percent) / 100;
export const hp = percent => (SCREEN_HEIGHT * percent) / 100;

const BASE_WIDTH = 375;
const BASE_HEIGHT = 667;

const SCALE_WIDTH = SCREEN_WIDTH / BASE_WIDTH;
const SCALE_HEIGHT = SCREEN_HEIGHT / BASE_HEIGHT;
const SCALE = Math.min(SCALE_WIDTH, SCALE_HEIGHT);

export const fontSize = size => Math.ceil(size * SCALE);

export const totalSize = percent => {
  const diagonal = Math.sqrt(SCREEN_HEIGHT ** 2 + SCREEN_WIDTH ** 2);
  return (diagonal * percent) / 100;
};


const COL = 3;
export const MARGIN = 8;
export const SIZE = Dimensions.get('window').width / COL - MARGIN;

export const getPosition = index => {
  'worklet';
  return {
    x: (index % COL) * SIZE,
    y: Math.floor(index / COL) * SIZE,
  };
};

export const getOrder = (x, y) => {
  'worklet';
  const row = Math.round(y / SIZE);
  const col = Math.round(x / SIZE);
  return row * COL + col;
};