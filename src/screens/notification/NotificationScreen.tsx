import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../component/view/Container';
import Header from '../../component/header/Header';
import {
  COLORS,
  ICONS,
  IMAGES,
  NotificationData,
  USERS,
} from '../../constant/constant';
import {useNavigation} from '@react-navigation/native';
import {getUserToken, makeGetApiCall} from '../../utils/helper';
import {PROVIDER_URLS} from '../../utils/config';
import {useDispatch} from 'react-redux';
import {
  addSelectedOrderDetails,
  addSelectedUserData,
} from '../../redux/dataSlice';
import ActivityIndicter from '../../component/activityIndicator';
import {hp, wp} from '../../config';
import {BackBtnHandler} from '../../utils/backBtnHandler';

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [notificationList, setNotificationList] = useState([]);
  const [token, setToken] = useState('');
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  BackBtnHandler(false, () => {
    navigation.goBack();
    return true;
  });

  useEffect(() => {
    getToken();
    getAllNotifications();
  }, [token]);

  const getToken = async () => {
    let token = await getUserToken();
    setToken(token);
  };

  const getAllNotifications = async () => {
    setLoading(true);
    let url = PROVIDER_URLS.GET_USER_NOTIFICATION;
    let {result} = await makeGetApiCall(url, token);
    setNotificationList(result.data);
    setLoading(false);
    if (result?.data?.length === 0) {
      setMessage(result?.message);
    }
  };

  const navigateToOrderDetails = (item: any) => {
    const details = {
      date_time: new Date(item?.order?.updated_at).toLocaleString(),
      order_id: item?.order?.order_id || '123',
      address: item?.order?.address,
      lock_code: item?.order?.lock_code || '5789',
      shop_name: item?.provider?.shop_name,
      services_details: item?.order?.item_details,
      total_price: item?.order?.total_price || '180.00',
      order_status: 'Pending',
      payment_status: 'Paid',
      profile_image: item?.provider?.profile_image,
      mobile_number: item?.provider?.mobile_number,
      name: item?.provider?.name,
    };
    dispatch(addSelectedUserData(item?.user));
    dispatch(addSelectedOrderDetails(details));
    navigation.navigate('OrderDetail' as never);
  };

  const renderNotificationsItem = (item: any) => {
    console.log('item=n=>', item);

    const details = {
      message: item?.notification_message || 'Message not available',
      name: item?.provider?.shop_name || 'User',
      date: new Date(item?.order?.updated_at).toLocaleDateString(),
      time: new Date(item?.order?.updated_at).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
      image: item?.provider?.profile_image,
    };
    return (
      <View style={styles.notificationCard}>
        <View style={styles.rowContainer}>
          <View style={styles.iconContainer}>
            <Image source={ICONS.picking_box} style={styles.icon} />
          </View>

          <View style={styles.textContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{item?.notification_message}</Text>
            </View>
            <View style={styles.userRow}>
              <Image
                source={details?.image ? {uri: details.image} : IMAGES.profile}
                style={styles.userImage}
              />
              <Text style={styles.userName}>{details.name}</Text>
            </View>
          </View>

          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{details.date}</Text>
            <Text style={styles.timeText}>{details.time}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigateToOrderDetails(item)}
            style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>See Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Container containerStyle={{paddingBottom: 0}}>
        <Header title="Notifications" />

        {message.length > 0 ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 16, color: 'black', fontWeight: '600'}}>
              {message}
            </Text>
          </View>
        ) : (
          <FlatList
            data={notificationList}
            contentContainerStyle={styles.flatListContainer}
            renderItem={({item}) => renderNotificationsItem(item)}
          />
        )}
      </Container>
      {loading && <ActivityIndicter show={loading} />}
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    paddingTop: 20,
  },
  notificationCard: {
    width: '100%',
    backgroundColor: '#F1F1F1',
    marginVertical: 10,
    borderRadius: 8,
  },
  rowContainer: {
    flex: 0.6,
    flexDirection: 'row',
  },
  iconContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 0.6,
  },
  titleRow: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: hp(2),
  },
  userRow: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 30,
    resizeMode: 'cover',
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.black,
    marginHorizontal: 10,
  },
  timeContainer: {
    flex: 0.2,
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.txtGray,
  },
  buttonContainer: {
    flex: 0.4,
    alignItems: 'center',
    paddingTop: 10,
  },
  detailsButton: {
    width: '90%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  detailsButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
  },
});

export default NotificationScreen;
