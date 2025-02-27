import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Container from '../../component/view/Container';
import Header from '../../component/header/Header';
import {COLORS, ICONS, IMAGES, TimeSlots, USERS} from '../../constant/constant';
import Button from '../../component/button/Button';
import {styles} from './styles';
import RBSheet from 'react-native-raw-bottom-sheet';
import OutLinedButton from '../../component/button/OutLinedButton';
import {ClothsTypes} from '../../constant/constant';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import CustomDropdown from '../../component/custom_dropdown/CustomDropdown';
import {
  getUserToken,
  makeGetApiCall,
  makePostApiCall,
} from '../../utils/helper';
import {PROVIDER_URLS} from '../../utils/config';
import ActivityIndicter from '../../component/activityIndicator';

const OrderDetails = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const refRBSheet = useRef();
  const [selectedClothId, setSelectedClothId] = useState([]);
  const [timeSlot, setTimeSlot] = useState('');
  const [profile, setProfile] = useState({});
  const venderData = useSelector(state => state?.selectedUser);
  const [selectedValues, setSelectedValues] = useState({}); // Track selected service per item
  const [selectedClothTypeItem, setSelectedClothTypeItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([
    {label: 'Wash', value: 'Wash'},
    {label: 'Iron', value: 'Iron'},
    {label: 'Dry Clean', value: 'Dry Clean'},
  ]);
  const navigation = useNavigation();
  const refTimeBottomRef = useRef();

  useEffect(() => {
    fetchProfileDetails();
  }, []);

  const fetchProfileDetails = async () => {
    let token = await getUserToken();
    let {result} = await makeGetApiCall(PROVIDER_URLS.PROFILE, token);
    console.log('data==>', result);
    setProfile(result?.data);
  };

  const prepareOrderData = () => {
    const formattedItems = selectedClothTypeItem.map(item => ({
      item_name: item.type,
      quantity: item.quantity,
      service_type: item.selectedService,
      price_per_unit:
        venderData?.all_services.find(
          service => service.name === item.selectedService,
        )?.price || 0,
    }));

    const totalPrice = formattedItems.reduce(
      (acc, item) => acc + item.quantity * item.price_per_unit,
      0,
    );

    const orderData = {
      provider_id: venderData?.id || 1, // Replace with actual provider ID
      user_id: profile?.user_id, // Replace with actual user ID
      total_price: totalPrice,
      item_details: formattedItems,
      scheduled_pickup_time: timeSlot,
    };

    return orderData;
  };

  const validation = () => {
    if (!selectedClothTypeItem?.length) {
      Alert.alert('Error', 'Please select an item.');
      return false;
    } else {
      return true;
    }
  };

  const submitOrder = async () => {
    if (validation()) {
      setLoading(true);
      let token = await getUserToken();
      const orderData = prepareOrderData();
      const url = PROVIDER_URLS.PLACE_ORDER;
      let {result} = await makePostApiCall(url, orderData, false, token);
      setLoading(false);
      if (result.success == true) {
        setIsModalVisible(true);
      }
    }
  };

  const cancelModal = () => {
    setIsModalVisible(false);
  };

  const renderModal = () => {
    return (
      <Modal
        statusBarTranslucent
        visible={isModalVisible}
        backdropColor={'rgba(0,0,0,0.1)'}
        animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBoxContainer}>
            <View style={styles.modalImageAndTextContainer}>
              <View style={styles.modalImageContainer}>
                <Image source={IMAGES.success} style={styles.modalImageStyle} />
              </View>

              <Text style={styles.modalText}>Payment Successful !</Text>
            </View>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={styles.cancelButtonStyle}
                onPress={cancelModal}>
                <Text style={styles.cancelButtonText}>cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('TabNavigation', {screen: 'OrderScreen'})
                }
                style={styles.orderButtonStyle}>
                <Text style={styles.orderTextStyle}>Sell All Orders</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.crossIconContainer}
              onPress={cancelModal}>
              <Image source={ICONS.cancel} style={{width: 28, height: 28}} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const renderVendorDetails = () => {
    return (
      <View style={styles.orderItemContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={
              venderData?.profile_image
                ? {uri: venderData?.profile_image}
                : IMAGES.profile
            }
            style={styles.orderImage}
          />
        </View>
        <View style={styles.orderDetails}>
          <Text style={styles.orderName}>{venderData?.shop_name}</Text>
          <Text style={styles.orderDateTime}>{venderData?.address}</Text>
          {/* <View style={styles.servicesContainer}>
              {["Iron","Dry Clean","Washing"].map((service, index) => (
              <Text key={index} style={styles.serviceText} ellipsizeMode='tail'>
                  {service}
              </Text>
              ))}
          </View> */}
        </View>

        {/* <View style={styles.priceContainer}>
        <View style={styles.priceRow}>
            <Image source={ICONS.rupees} style={styles.rupeesIcon} />
            <Text style={styles.orderPrice}>130</Text>
        </View>
        </View> */}
      </View>
    );
  };

  const renderSelectedItemContainer = () => {
    return (
      <View style={{width: '100%', minHeight: '85%'}}>
        <Text
          style={{
            fontWeight: '500',
            position: 'absolute',
          }}>
          Delivery at -
        </Text>

        <View style={styles.lockboxAndCallIconContainer}>
          <Text style={styles.lockboxText}>
            {timeSlot || 'Provide lock box drop off'}
          </Text>
          <TouchableOpacity
            onPress={openTimeSlotBottomSheet}
            style={styles.callIconButton}>
            <Text style={styles.callText}>Change</Text>
          </TouchableOpacity>
        </View>

        <View style={{height: '80%'}}>{renderSelectedClothsTypeItems()}</View>
      </View>
    );
  };

  // const onSelectClothType = (item:any) =>{
  //   if(selectedClothId.includes(item.id)){
  //     let filteredSelectedIds  = selectedClothId.filter(id=>id!==item.id)
  //     let filteredSlectedClothTypeItems = selectedClothTypeItem.filter(selected=>selected.id!= item.id)
  //     setSelectedClothId([...filteredSelectedIds])
  //     setSelectedClothTypeItems([...filteredSlectedClothTypeItems])
  //   }else{
  //     setSelectedClothId([...selectedClothId,item.id])
  //     setSelectedClothTypeItems([...selectedClothTypeItem,item])
  //   }
  //   refRBSheet?.current?.close()
  // }

  const handleValueChange = (id, value) => {
    setSelectedValues(prevState => ({
      ...prevState,
      [id]: value,
    }));

    setSelectedClothTypeItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const servicePrice =
            venderData?.all_services.find(service => service.name === value)
              ?.price || 0;
          return {
            ...item,
            selectedService: value,
            totalPrice: item.quantity * servicePrice, // Update price
          };
        }
        return item;
      }),
    );
  };

  const onSelectTimeSlot = (item: any) => {
    setTimeSlot(item.time_range);
    refTimeBottomRef?.current?.close();
  };

  const onSelectClothType = item => {
    if (selectedClothId.includes(item.id)) {
      // Remove item if already selected
      let filteredSelectedIds = selectedClothId.filter(id => id !== item.id);
      let filteredSelectedClothTypeItems = selectedClothTypeItem.filter(
        selected => selected.id !== item.id,
      );
      setSelectedClothId([...filteredSelectedIds]);
      setSelectedClothTypeItems([...filteredSelectedClothTypeItems]);
    } else {
      // Get price of "Wash" service from vendor data
      const defaultService = 'Wash';
      const servicePrice =
        venderData?.all_services.find(
          service => service.name === defaultService,
        )?.price || 0;

      // Add new item with default values
      setSelectedClothId([...selectedClothId, item.id]);
      setSelectedClothTypeItems([
        ...selectedClothTypeItem,
        {
          ...item,
          selectedService: defaultService,
          quantity: 1,
          totalPrice: servicePrice,
        },
      ]);
    }
    refRBSheet?.current?.close();
  };

  const increaseCount = id => {
    setSelectedClothTypeItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const servicePrice =
            venderData?.all_services.find(
              service => service.name === item.selectedService,
            )?.price || 0;
          return {
            ...item,
            quantity: item.quantity + 1,
            totalPrice: (item.quantity + 1) * servicePrice,
          };
        }
        return item;
      }),
    );
  };

  const decreaseCount = id => {
    setSelectedClothTypeItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id && item.quantity > 1) {
          const servicePrice =
            venderData?.all_services.find(
              service => service.name === item.selectedService,
            )?.price || 0;
          return {
            ...item,
            quantity: item.quantity - 1,
            totalPrice: (item.quantity - 1) * servicePrice,
          };
        }
        return item;
      }),
    );
  };

  // const handleValueChange = (id, value) => {
  //   setSelectedValues((prevState) => ({
  //     ...prevState,
  //     [id]: value,
  //   }));

  //   setSelectedClothTypeItems((prevItems) =>
  //     prevItems.map((item) => {
  //       if (item.id === id) {
  //         const servicePrice = venderData.all_services.find(service => service.name === value)?.price || 0;
  //         return {
  //           ...item,
  //           selectedService: value,
  //           totalPrice: item.quantity * servicePrice, // Update price
  //         };
  //       }
  //       return item;
  //     })
  //   );
  // };

  const renderSelectedClothsTypeItems = () => {
    return (
      <View style={{height: '100%', marginBottom: '50%'}}>
        <FlatList
          data={selectedClothTypeItem}
          ListFooterComponent={
            <OutLinedButton
              onPress={openBottomSheet}
              title="Add more item"
              style={{position: 'relative'}}
            />
          }
          renderItem={({item}) => (
            <View style={styles.serviceItemContainer}>
              <View style={styles.serviceItemTextAndQuantityContainer}>
                <Text style={styles.serviceItemNameText}>{item.type}</Text>

                {/* Custom Dropdown Component */}
                <CustomDropdown
                  options={items}
                  selectedValue={selectedValues[item.id] || 'Wash'}
                  onSelect={value => handleValueChange(item.id, value)}
                  label="Select Service"
                />
              </View>

              <View style={{flex: 0.2}}>
                <View style={styles.priceAndQuantityContainer}>
                  <Text style={styles.priceText}>$ {item.totalPrice || 0}</Text>
                </View>
                <View style={styles.quantityContainer}>
                  <View style={styles.quantityContainer2}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: COLORS.white,
                      }}>
                      <Text onPress={() => decreaseCount(item.id)}> - </Text>{' '}
                      {item.quantity || 1}{' '}
                      <Text onPress={() => increaseCount(item.id)}> + </Text>
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    );
  };

  const onAddClothsTypePress = () => {
    refRBSheet?.current.close();
  };

  const renderBottomSheet = () => {
    return (
      <RBSheet
        ref={refRBSheet}
        useNativeDriver={true}
        draggable={true}
        customStyles={{
          container: styles.bottomSheetContainer,
          wrapper: styles.bottomSheetWrapper,
          draggableIcon: styles.draggableIcon,
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>Choose Cloth Type</Text>

          <FlatList
            data={ClothsTypes}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => onSelectClothType(item)}
                style={
                  selectedClothId.includes(item.id)
                    ? styles.clothsTypeSelectedListItemStyle
                    : styles.clothsTypeListItemStyle
                }>
                <Text style={styles.itemText}>{item.type}</Text>
              </TouchableOpacity>
            )}
          />

          <Button
            title="Add"
            onPress={onAddClothsTypePress}
            style={styles.addButton}
          />
        </View>
      </RBSheet>
    );
  };

  const openBottomSheet = () => {
    refRBSheet?.current?.open();
  };

  const openTimeSlotBottomSheet = () => {
    refTimeBottomRef?.current?.open();
  };

  const renderTimeBottomSheet = () => {
    return (
      <RBSheet
        ref={refTimeBottomRef}
        useNativeDriver={true}
        draggable={true}
        customStyles={{
          container: styles.bottomSheetTimeSlotContainer,
          wrapper: styles.bottomSheetWrapper,
          draggableIcon: styles.draggableIcon,
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>Choose Time Slot or Lock Box</Text>

          <FlatList
            data={TimeSlots}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => onSelectTimeSlot(item)}
                style={styles.clothsTypeListItemStyle}>
                <Text style={styles.itemText}>{item.time_range}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </RBSheet>
    );
  };

  return (
    <View>
      <Container containerStyle={{paddingBottom: 0}}>
        <Header
          isFilter={false}
          title="Place Order"
          onBackPress={() => navigation.goBack()}
        />

        {/* Vendor Details */}
        {renderVendorDetails()}

        {/* Selected Item */}
        {renderSelectedItemContainer()}
      </Container>

      <View style={styles.bottomModalButtonContainer}>
        <Text
          style={{
            color: 'black',
            fontSize: 28,
            fontWeight: '700',
            marginLeft: 30,
          }}>
          Pay
        </Text>
        <Button
          style={{width: '45%', alignSelf: 'flex-end', right: 30}}
          titleStyle={{fontSize: 28}}
          onPress={submitOrder}
          title={`$ ${prepareOrderData().total_price}`}
        />
      </View>
      {renderModal()}
      {renderBottomSheet()}
      {renderTimeBottomSheet()}
      {loading && <ActivityIndicter show={loading} />}
    </View>
  );
};

export default OrderDetails;
