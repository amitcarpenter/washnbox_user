import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  FlatList,
  TextInput,
  Dimensions,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import Container from '../../component/view/Container';
import Header from '../../component/header/Header';
import {ClothsTypes, COLORS, ICONS, IMAGES} from '../../constant/constant';
import Input from '../../component/input/Input';
import Button from '../../component/button/Button';
// import Geolocation from 'react-native-geolocation-service';
import Geolocation from '@react-native-community/geolocation';
import {CommonActions, useNavigation} from '@react-navigation/native';
import PhoneInput from 'react-native-phone-number-input';
import {launchImageLibrary} from 'react-native-image-picker';
import RadioGroup from 'react-native-radio-buttons-group';
import CheckBox from 'react-native-check-box';
import OutLinedButton from '../../component/button/OutLinedButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import {ProfileDataType, ServiceItems, Services} from '../../utils/type';
import {
  checkIsDataValid,
  getLocationCoordinates,
  getUserToken,
  makeGetApiCall,
  makePostApiCall,
  renderAlertBox,
} from '../../utils/helper';
import {NAVIGATE_TO, PROVIDER_URLS} from '../../utils/config';
import {getAddressFromCoordinates} from '../../utils/helper';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActivityIndicter from '../../component/activityIndicator';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const phoneInput = useRef<PhoneInput>(null);
  const [imageUri, setImageUri] = useState('');
  const refRBSheet = useRef();
  const [selectedClothId, setSelectedClothId] = useState([]);
  const [selectedClothTypeItem, setSelectedClothTypeItems] = useState<Services>(
    [],
  );
  const [businessName, setBusinessName] = useState('');
  const [address, setAddress] = useState('');
  const [upiId, setUpiId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [services, setServices] = useState([]);
  const [profile, setProfile] = useState({});
  const [clothsTypes, setClothsType] = useState([]);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const number = useSelector((state: any) => state.loginData.number);
  const [coordinates, setCoordinates] = useState({});

  useEffect(() => {
    getToken();
    fetchProfileDetails();
    // fetchClothsTypesForBottomSheet()
  }, [token]);

  useEffect(() => {
    // getLocationPermission()
    // fetchCoordinates()
  }, []);

  const getToken = async () => {
    let token = await getUserToken();
    setToken(token);
  };

  const fetchProfileDetails = async () => {
    setLoading(true);
    let {result} = await makeGetApiCall(PROVIDER_URLS.PROFILE, token);
    console.log('data===>', result);
    setBusinessName(result?.data?.name);
    setEmail(result?.data?.email);
    setProfile(result?.data);
    setLoading(false);
  };

  const selectImage = () => {
    let data;
    const options = {
      mediaType: 'photo',
      quantity: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        Alert.alert('You cancelled image selection');
      } else if (response.errorMessage) {
        Alert.alert('Error:', response.errorMessage);
      } else {
        // data = {
        //   name: response.assets[0].fileName || 'photo.jpg',
        //   type: response.assets[0].type || 'image/jpeg',
        //   uri : response?.assets[0].uri
        // }
        setImageUri(response?.assets[0].uri);
      }
    });
    // setProfile(data)
  };

  const renderProfileImage = () => {
    return (
      <View style={styles.profileContainer}>
        <View style={styles.profileImageWrapper}>
          <Image
            source={
              imageUri
                ? {uri: imageUri}
                : profile?.profile_image
                ? {uri: profile?.profile_image}
                : IMAGES.profile
            }
            style={styles.profileImage}
          />
          <TouchableOpacity
            onPress={selectImage}
            activeOpacity={0.95}
            style={styles.cameraButton}>
            <Image source={IMAGES.camera} style={styles.cameraIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const onServicePriceEnter = (type: string, name: string, text: string) => {
    const updatedItems = selectedClothTypeItem.map(item => {
      if (item.type === type) {
        return {
          ...item,
          services: item.services.map(service =>
            service.name === name ? {...service, price: text} : service,
          ),
        };
      }
      return item;
    });

    setSelectedClothTypeItems(updatedItems);
  };

  const extractPhoneDetails = (fullNumber: string) => {
    if (!fullNumber) return {countryCode: '+91', localNumber: ''};

    // Remove spaces, dashes, and parentheses but keep the number intact
    const cleanedNumber = fullNumber.replace(/[\s-()]/g, '');

    // Match +91 and extract the rest of the number
    const phoneRegex = /^\+91(\d{6,17})$/;
    const match = cleanedNumber.match(phoneRegex);

    if (match) {
      return {countryCode: '+91', localNumber: match[1]}; // Return number without +91
    }

    // If no +91, validate that the number length is between 6 and 17
    if (cleanedNumber.length >= 6 && cleanedNumber.length <= 17) {
      return {countryCode: '+91', localNumber: cleanedNumber};
    }

    return {countryCode: '+91', localNumber: ''}; // Invalid case
  };

  const renderInputFields = () => {
    const {countryCode, localNumber} = extractPhoneDetails(
      profile?.mobile_number || '',
    );
    return (
      <View style={{marginBottom: 30}}>
        <Input
          editable={true}
          keyboardType="email-address"
          label="Full Name"
          placeholder="Enter your name"
          labelStyle={styles.labelStyle}
          containerStyle={styles.inputContainer}
          onChangeText={text => setBusinessName(text)}
          value={businessName}
        />

        {/* <View style={styles.locationContainer}>
          <Text style={styles.locationLabel}>Location on map</Text>
          <Image source={IMAGES.map} style={{width:"100%",borderRadius:10}} />
          <Text style={styles.addressText}>{address || "Loading ..."}</Text>
        </View> */}

        {/* <Input 
          keyboardType="email-address" 
          label='UPI ID for Payment' 
          placeholder="Enter your UPI ID" 
          labelStyle={styles.labelStyle}
          containerStyle={styles.inputContainer}
          onChangeText={text=>{
            setUpiId(text)
          }}
          /> */}

        <Input
          editable={true}
          keyboardType="email-address"
          label="Email"
          placeholder="Enter your email"
          labelStyle={styles.labelStyle}
          containerStyle={styles.inputContainer}
          onChangeText={text => {
            setEmail(text);
          }}
          value={email}
        />
        <Input
          editable={false}
          keyboardType="email-address"
          label="Phone"
          placeholder="Enter your email"
          labelStyle={styles.labelStyle}
          containerStyle={styles.inputContainer}
          onChangeText={text => {
            setEmail(text);
          }}
          value={profile?.mobile_number}
        />

        {/* phone input */}
        {/* <View style={{marginVertical: 20}}>
          <Text style={styles.labelStyle}>Phone</Text>
          <PhoneInput
            ref={phoneInput}
            defaultValue={profile?.mobile_number}
            disabled={true}
            defaultCode="IN"
            layout="second"
            placeholder={localNumber}
            containerStyle={styles.phoneInputStyle}
            onChangeText={text => {
              setValue(text);
            }}
            value={profile?.mobile_number}
            onChangeFormattedText={text => {
              setFormattedValue(text);
            }}
            textInputStyle={{
              padding: 0,
              margin: 0,
              marginTop: 0,
              fontSize: 16,
              fontWeight: '500',
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
        </View> */}

        {/* services */}
        {/* <View style={{marginTop:20}}>
          <Text style={styles.locationLabel}>Services</Text>
          {renderCheckBoxes()}
        </View> */}

        {/* selected cloths item */}
        {/* {renderSelectedClothsTypeItems()} */}
      </View>
    );
  };

  const getLocationPermission = () => {
    // Geolocation.requestAuthorization()
  };

  const fetchCoordinates = async () => {
    try {
      const coordinates = await getLocationCoordinates();
      setCoordinates(coordinates);
      if (coordinates) fetchAddressFromCoordinates(coordinates);
      // console.log("coordinates =>", coordinates);
    } catch (error) {
      console.error('Failed to fetch coordinates:', error);
    }
  };

  const fetchAddressFromCoordinates = async coordinates => {
    let address = await getAddressFromCoordinates(
      coordinates.latitude,
      coordinates.longitude,
    );
    setAddress(address);
  };

  const onSelectClothType = (item: any) => {
    if (selectedClothId.includes(item.id)) {
      let filteredSelectedIds = selectedClothId.filter(id => id !== item.id);
      let filteredSlectedClothTypeItems = selectedClothTypeItem.filter(
        selected => selected.id != item.id,
      );
      setSelectedClothId([...filteredSelectedIds]);
      setSelectedClothTypeItems([...filteredSlectedClothTypeItems]);
    } else {
      setSelectedClothId([...selectedClothId, item.id]);
      setSelectedClothTypeItems([...selectedClothTypeItem, item]);
    }
  };

  const onAddClothsTypePress = () => {
    refRBSheet.current.close();
  };

  const sumitDetails = async () => {
    // let formData = new FormData();
    // let data: ProfileDataType = {
    //   name: businessName,
    //   address: address,
    //   email: email,
    //   phone: phone,
    //   upi_id: upiId,
    // };
    // let status = await checkIsDataValid(data);

    // if (!status.isDeatilsValid) {
    //   renderAlertBox(status);
    // } else {
    //   let data = {
    //     name: businessName,
    //     email: email,
    //     file: profile,
    //     // upiId:upiId
    //   };
    //   // formData.append('shop_name',businessName)
    //   // formData.append('address',address)
    //   // formData.append("email",email)
    //   // formData.append("phone",phone)
    //   // formData.append("services",JSON.stringify(selectedClothTypeItem))
    //   // formData.append("profile",profile)
    //   let response = await makePostApiCall(
    //     PROVIDER_URLS.EDIT_LAUNDRY_PROFILE,
    //     data,
    //     true,
    //     token,
    //   );
    //   console.log('login api response ===>', response);
    //   // response.success
    //   if (response.success) {
    //     navigation.navigate(NAVIGATE_TO.TAB_NAVIGATION as never);
    //   }
    // }

    setLoading(true);
    const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    const file = {
      uri: imageUri,
      type: 'image/jpeg',
      name: String(filename),
    };
    let formData = new FormData();
    formData.append('email', email);
    formData.append('name', businessName);
    if (imageUri) {
      formData.append('file', file);
    }

    let response = await makePostApiCall(
      PROVIDER_URLS.EDIT_LAUNDRY_PROFILE,
      formData,
      true,
      token,
    );
    setLoading(false);
    console.log('response=UP=>', response.result);

    if (response.success) {
      fetchProfileDetails();
      Alert.alert('User details updated successfully!');
    }
  };

  const handleLogOut = async () => {
    // navigation.dispatch(
    //   CommonActions.reset({
    //     index: 1,
    //     routes: [{name: 'RegisterPhoneScreen'}],
    //   }),
    // );
    navigation.navigate('RegisterPhoneScreen' as never);
    await AsyncStorage.clear();
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContainer}>
      <Header title="Profile" />
      {renderProfileImage()}
      {renderInputFields()}
      <Button
        // disabled={true}
        onPress={sumitDetails}
        title="Update"
        style={styles.updateButton}
      />
      <Button
        // disabled={true}
        onPress={handleLogOut}
        title="Log Out"
        style={styles.updateButton}
      />
      {loading && <ActivityIndicter show={loading} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: COLORS.white,
  },
  clothsTypeItemStyle: {
    width: '96%',
    height: 60,
    borderRadius: 10,
    backgroundColor: '#F3FAFF',
    alignSelf: 'center',
    marginTop: 20,
    paddingLeft: 16,
    justifyContent: 'center',
  },
  clothsTypeSelectedItemStyle: {
    width: '96%',
    height: 60,
    borderRadius: 10,
    backgroundColor: '#F3FAFF',
    alignSelf: 'center',
    marginTop: 20,
    paddingLeft: 16,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  profileImageWrapper: {
    width: 164,
    height: 164,
    borderRadius: 164,
  },
  profileImage: {
    width: 164,
    height: 164,
    borderRadius: 164,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  cameraIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  inputContainer: {
    marginTop: 20,
  },
  labelStyle: {
    color: COLORS.primary,
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  locationContainer: {
    marginTop: 20,
    // alignSelf:"flex-start"
  },
  locationLabel: {
    color: COLORS.primary,
    fontSize: 16,
    lineHeight: 16,
    fontWeight: '600',
    marginBottom: 18,
  },
  mapImage: {
    // width: "100%",
    alignSelf: 'center',
    // borderRadius: 12,
  },
  addressText: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
  },
  updateButton: {
    marginTop: 10,
    position: 'relative',
  },
  phoneInputStyle: {
    width: '100%',
    height: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    // paddingHorizontal:16,
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
  },
  checkBoxTextContainer: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  checkBoxText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
    lineHeight: 17,
  },
  card: {
    width: '100%',
    height: 146,
    borderRadius: 10,
    backgroundColor: '#E7E7E7',
    marginTop: 16,
  },
  headerContainer: {
    flex: 0.35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  deleteIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  detailsContainer: {
    flex: 0.65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceBox: {
    width: 120,
    height: 80,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  serviceText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  input: {
    borderWidth: 1,
    width: 90,
    borderRadius: 10,
    borderColor: '#D0D0D0',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
  bottomSheetContainer: {
    height: 500,
    borderWidth: 0.5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  bottomSheetWrapper: {
    backgroundColor: 'transparent',
  },
  draggableIcon: {
    backgroundColor: 'gray',
  },
  contentContainer: {
    flex: 1,
  },
  titleText: {
    alignSelf: 'center',
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 16,
    marginVertical: 10,
  },
  clothsTypeListItemStyle: {
    width: '94%',
    height: 60,
    backgroundColor: '#F3FAFF',
    alignSelf: 'center',
    marginTop: 15,
    justifyContent: 'center',
    paddingLeft: 20,
    borderRadius: 15,
  },
  clothsTypeSelectedListItemStyle: {
    width: '94%',
    height: 60,
    backgroundColor: '#F3FAFF',
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignSelf: 'center',
    marginTop: 15,
    justifyContent: 'center',
    paddingLeft: 20,
    borderRadius: 15,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
  },
  addButton: {
    width: '80%',
    alignSelf: 'center',
  },
});

export default ProfileScreen;
