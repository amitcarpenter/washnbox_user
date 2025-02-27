import {
  View,
  FlatList,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
  Linking,
} from 'react-native';
import React, {useRef} from 'react';
import Container from '../../component/view/Container';
import Header from '../../component/header/Header';
import {COLORS, ICONS, IMAGES, USERS} from '../../constant/constant';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {hp, wp} from '../../config';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const VerndorDetailScreen = () => {
  const navigation = useNavigation();
  const venderData = useSelector((state: any) => state.selectedUser);
  const mapRef = useRef();

  const callVendor = (phone_number: number) => {
    let phoneUrl = `tel:${phone_number}`;
    Linking.openURL(phoneUrl).catch(err =>
      console.error('Error opening dialer', err),
    );
  };

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${venderData?.latitude},${venderData?.longitude}`;
    Linking.openURL(url);
  };

  const renderVendorImageContainer = () => {
    return (
      <ImageBackground
        source={
          venderData?.profile_image
            ? {uri: venderData?.profile_image}
            : IMAGES.profile
        }
        style={styles.topImage}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={styles.backButtonStyle}>
          <Image source={IMAGES.back_icon} style={styles.backButtonImage} />
        </TouchableOpacity>
      </ImageBackground>
    );
  };

  const renderVendorDetailsContainer = () => {
    return (
      <View style={styles.detailContainer}>
        <View style={styles.serviceContainer}>
          <View style={styles.serviceRow}>
            {venderData?.all_services?.map((item, index) => (
              <Text key={index} style={styles.serviceText} ellipsizeMode="tail">
                {item.name}
              </Text>
            ))}
          </View>
          <Text style={styles.vendorTitle}>
            {venderData?.shop_name || 'Not Available'}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.userInfoRow}>
            <View style={styles.userDetails}>
              <Image source={USERS.user1} style={styles.userImage} />
              <Text style={styles.userName}>
                {venderData?.shop_name || 'Not Available'}
              </Text>
            </View>
            <View style={styles.callButtonContainer}>
              <TouchableOpacity
                onPress={() => callVendor(venderData?.mobile_number)}
                style={styles.callIconButton}>
                <Image source={ICONS.phone} style={styles.callIconImage} />
                <Text style={styles.callText}>Call</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.dropOffContainer}>
            <Text style={styles.dropOffTitle}>Drop off location</Text>
            {/* <Image source={IMAGES.map} style={styles.mapImage} /> */}
            <View style={styles.mapBox}>
              <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                  latitude: Number(venderData?.latitude),
                  longitude: Number(venderData?.longitude),
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}>
                <Marker
                  coordinate={{
                    latitude: Number(venderData?.latitude),
                    longitude: Number(venderData?.longitude),
                  }}
                />
              </MapView>
            </View>
            <View style={styles.addressRow}>
              <View style={styles.addressContainer}>
                <Text style={styles.addressText}>{venderData?.address}</Text>
              </View>
              <View style={styles.directionIconContainer}>
                <TouchableOpacity onPress={openGoogleMaps}>
                  <Image
                    source={ICONS.direction}
                    style={styles.directionIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderPlaceOrderButtonContainer = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('OrderDetailScreen')}
          style={styles.outlinedButtonStyle}>
          <Image source={ICONS.picking_box} style={styles.outlinedButtonIcon} />
          <Text style={styles.outlineButtonText}>Place an order</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Container containerStyle={styles.container}>
      {/* Image container */}
      {renderVendorImageContainer()}

      {/* Vendor Details Container */}
      {renderVendorDetailsContainer()}

      {/* Place order buton container */}
      {renderPlaceOrderButtonContainer()}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  topImage: {
    padding: 16,
    minHeight: '38%',
  },
  backButtonStyle: {
    width: 54,
    height: 52,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: COLORS.borderColor,
  },
  backButtonImage: {
    width: 10,
    height: 14,
    resizeMode: 'contain',
  },
  detailContainer: {
    height: '50%',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  serviceContainer: {
    height: '25%',
  },
  serviceRow: {
    flexDirection: 'row',
  },
  serviceText: {
    backgroundColor: '#FFF3FA',
    color: COLORS.black,
    fontWeight: '500',
    fontSize: 14,
    padding: 4,
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  vendorTitle: {
    fontWeight: '700',
    color: 'black',
    fontSize: 20,
  },
  infoContainer: {
    height: '75%',
    borderTopWidth: 1,
    borderTopColor: COLORS.borderColor,
  },
  userInfoRow: {
    height: '22%',
    flexDirection: 'row',
  },
  userDetails: {
    flex: 0.5,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  callButtonContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  callIconButton: {
    width: 90,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  callIconImage: {
    width: 14,
    right: 14,
    resizeMode: 'contain',
  },
  callText: {
    fontWeight: '600',
    color: COLORS.white,
  },
  dropOffContainer: {
    flex: 0.8,
  },
  dropOffTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.primary,
  },
  mapImage: {
    width: '100%',
    borderRadius: 10,
    marginVertical: 20,
  },
  addressRow: {
    flexDirection: 'row',
  },
  addressContainer: {
    flex: 0.8,
  },
  addressText: {
    fontSize: 16,
  },
  directionIconContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  directionIcon: {
    width: 52,
    height: 52,
  },
  footer: {
    height: '12%',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 1,
    justifyContent: 'center',
  },
  outlinedButtonStyle: {
    width: '90%',
    height: 60,
    flexDirection: 'row',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginTop: 10,
  },
  outlinedButtonIcon: {
    width: 24,
    height: 24,
  },
  outlineButtonText: {
    fontSize: 17,
    marginLeft: 15,
    lineHeight: 18,
    color: COLORS.primary,
    fontWeight: '600',
  },
  mapBox: {
    height: hp(17),
    width: wp(92),
    backgroundColor: COLORS.search_field_color,
    marginVertical: hp(1),
    borderRadius: 15,
    alignSelf: 'center',
    overflow: 'hidden',
    flex: 1,
  },
  map: {
    // height: hp(17),
    // width: wp(92),
    flex: 1,
  },
});

export default VerndorDetailScreen;
