import {
  View,
  Text,
  Image,
  Linking,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {fontSize, hp, wp} from '../../config';
import Header from '../../component/header/Header';
import {useNavigation} from '@react-navigation/native';
import {COLORS, ICONS, IMAGES} from '../../constant/constant';
import {BackBtnHandler} from '../../utils/backBtnHandler';

const OrderDetail = () => {
  const navigation = useNavigation();
  const orderDetails = useSelector((state: any) => state?.selectedOrderDetails);

  BackBtnHandler(false, () => {
    navigation.goBack();
    return true;
  });

  const itemList = orderDetails?.services_details || [];

  const callVendor = (phone_number: number) => {
    if (phone_number) {
      let phoneUrl = `tel:${phone_number}`;
      Linking.openURL(phoneUrl).catch(err =>
        console.error('Error opening dialer', err),
      );
    }
  };

  return (
    <View style={styles.container}>
      <Header
        isFilter={false}
        title="Order Details"
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.vendorDetailsBox}>
        <Image
          style={styles.imgBox}
          source={
            orderDetails?.profile_image
              ? {uri: orderDetails?.profile_image}
              : IMAGES.profile
          }
        />
        <View style={styles.detailTxtBox}>
          <View style={styles.box1}>
            <Text style={styles.txt}>{orderDetails?.shop_name}</Text>
            <Text style={styles.txt}>$ {orderDetails?.total_price}</Text>
          </View>
          <Text style={styles.txt1}>{orderDetails?.date_time}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.txtBox}>Iron</Text>
            <Text style={styles.txtBox}>Dry Clean</Text>
            <Text style={styles.txtBox}>Washing</Text>
          </View>
        </View>
      </View>
      <View style={styles.box1}>
        <Text style={styles.txt}>{orderDetails?.name}</Text>
        <TouchableOpacity
          onPress={() => callVendor(orderDetails?.mobile_number)}
          style={styles.callIconButton}>
          <Image source={ICONS.phone} style={styles.callIconImage} />
          <Text style={styles.callText}>Call</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollBox}>
        {itemList.map((item: any, index: number) => {
          console.log('item==>', item);

          return (
            <View style={styles.listContainer}>
              <View style={styles.box1}>
                <Text style={styles.txt2}>{item?.item_name}</Text>
                <Text
                  style={[
                    styles.txt2,
                    {color: COLORS.primary, marginRight: wp(4)},
                  ]}>
                  $ {item?.price_per_unit}
                </Text>
              </View>
              <View style={styles.box1}>
                <Text style={styles.txt}>{item?.service_type}</Text>
                <View style={styles.callIconButton1}>
                  <Text style={[styles.txt, {color: COLORS.white}]}>
                    {item?.quantity}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
    backgroundColor: COLORS.white,
  },
  vendorDetailsBox: {
    flexDirection: 'row',
    marginVertical: hp(2.5),
  },
  imgBox: {
    height: hp(9),
    width: hp(9),
    backgroundColor: COLORS.orderItemBackgroundColor,
    borderRadius: 12,
  },
  detailTxtBox: {
    marginLeft: wp(4),
    flex: 1,
    justifyContent: 'space-around',
  },
  txt: {
    fontSize: fontSize(17),
    fontWeight: '600',
    color: COLORS.black,
  },
  txt1: {
    fontSize: fontSize(14),
    fontWeight: '500',
    color: '#8c8b8b',
  },
  txt2: {
    fontSize: fontSize(20),
    fontWeight: '600',
    color: COLORS.black,
  },
  txtBox: {
    paddingHorizontal: 5,
    marginHorizontal: 4,
    backgroundColor: COLORS.borderColor,
    color: COLORS.black,
    fontWeight: '400',
    borderRadius: 5,
    marginTop: 5,
  },
  box1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  callIconButton1: {
    width: 60,
    height: 36,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  callText: {
    fontWeight: '600',
    color: COLORS.white,
  },
  callIconImage: {
    width: 14,
    right: 14,
    resizeMode: 'contain',
  },
  scrollBox: {
    flexGrow: 1,
    marginTop: hp(2),
  },
  listContainer: {
    height: hp(12),
    backgroundColor: COLORS.orderItemBackgroundColor,
    marginVertical: hp(1),
    borderRadius: 15,
    paddingHorizontal: wp(6),
    justifyContent: 'space-between',
    paddingVertical: hp(1.5),
  },
});

export default OrderDetail;
