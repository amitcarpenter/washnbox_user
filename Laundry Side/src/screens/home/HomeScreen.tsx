import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList, Dimensions, Platform, Alert, BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react';
import Container from '../../component/view/Container';
import { COLORS, HomeScreenData, ICONS, IMAGES, USERS } from '../../constant/constant';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal"
import Header from '../../component/header/Header';
import CheckBox from 'react-native-check-box';
import Dropdown from "react-native-dropdown-picker"
import { PROVIDER_URLS } from '../../utils/config';
import { getUserToken, makeGetApiCall } from '../../utils/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';
import { addSelectedOrderDetails, addSelectedUserData } from '../../redux/dataSlice';
import { useDispatch } from 'react-redux';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height


const HomeScreen = () => {
  
  const navigation = useNavigation()
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Ready for Pick', value: 'Ready for Pick' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Received', value: 'Received' }
  ]);

  const [openPayStatus, setOpenPayStatus] = useState(false)
  const [payStatusValue, setPayStatusValue] = useState(null)
  const [payStatusItems, setPayStatusItems] = useState([
    { label: 'Cash on Delivery', value: 'Cash on Delivery' },
    { label: 'Paid', value: 'Paid' },
    // { label: 'Ready for Pick', value: 'Ready for Pick' }
  ]);
  const [token, setToken] = useState("")
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [pendingData,setPendingData] = useState([])
  const dispatch = useDispatch()
  
  useEffect(() => {
    const backAction = () => {
      console.log('Back button pressed');
      return true
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove()
  }, []);

  useEffect(()=>{
    getToken()
    fetchAllOrders()
  },[token])

  const getToken = async () =>{
    let token = await getUserToken()
    setToken(token)
  }

  const fetchAllOrders = async () =>{
    let url = PROVIDER_URLS.GET_PROVIDER_ORDERS
    let {result} = await makeGetApiCall(url,token)
    setPendingData(result.data)
    console.log("Home Screen Data =====>",result)
  }


  // <--------- Below this we have all the UI stuff ------->

  const renderSearchField = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchField}>
        <Image source={ICONS.search} style={styles.searchIcon} />
        <TextInput placeholder='Search' style={styles.searchInput} />
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Image source={IMAGES.logo} style={styles.logo} />
      <Image source={IMAGES.my_laundry} style={styles.laundryLogo} resizeMode='contain' />
      <TouchableOpacity onPress={()=>navigation.navigate("NotificationScreen")}>
        <Image source={ICONS.notification_bell} style={styles.notificationIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={openFilterModal} style={styles.filterButton}>
        <Image source={ICONS.filter} style={styles.filterIcon} />
      </TouchableOpacity>
    </View>
  );

  const navigateToOrderDetails = (item:any) =>{
    let orderDetails = {
      image:item.user.profile_image,
      name:item.user.name || "Not Available",
      updated_at:new Date(item?.order_payment?.updated_at).toLocaleString(),
      services:item?.item_details || [],
      total_price:item.total_price,
      order_id:item?.order_id,
      item_details:item?.item_details,
      scheduled_pickup_time: null,
    }
    dispatch(addSelectedUserData(item?.user))
    dispatch(addSelectedOrderDetails(orderDetails))
    navigation.navigate("OrderDetailScreen")
  }

  const renderOrderItem = ({ item }) => {
    const details = {
      image:item.user.profile_image,
      name:item.user.name || "Not Available",
      date:new Date(item?.order_payment?.updated_at).toLocaleString(),
      services:item?.item_details || [],
      total_price:item.total_price,
      order_id:item?.order_id,
      item_details:item?.item_details,
      scheduled_pickup_time: null,
    }
    // console.log(details)
    return(
      <TouchableOpacity activeOpacity={0.8} onPress={()=>navigateToOrderDetails(item)} style={styles.orderItemContainer}>
        <View style={styles.imageContainer}>
          <Image source={USERS.user1} style={styles.orderImage} />
        </View>
        <View style={styles.orderDetails}>
          <Text style={styles.orderName}>{details.name}</Text>
          <Text style={styles.orderDateTime}>{details.date}</Text>
          <View style={styles.servicesContainer}>
            {details.services?.map((service,index) => (
              <Text key={index} style={styles.serviceText} ellipsizeMode='tail'>
                {service?.item_name}
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.priceContainer}>
          <View style={styles.priceRow}>
            <Image source={ICONS.rupees} style={styles.rupeesIcon} />
            <Text style={styles.orderPrice}>{item.total_price}</Text>
          </View>
        </View>
    </TouchableOpacity>
    )
    
  };

  const renderOrdersList = () =>{
    return(
      <FlatList
          data={pendingData}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          renderItem={renderOrderItem}
          keyExtractor={(item, index) => index.toString()}
      />
    )
  }

  const closeFilterModal = () =>{
    setIsFilterModalOpen(false)
  }

  const openFilterModal = () =>{
    setIsFilterModalOpen(true)
  }

  const renderFilterModal = () => {
    return(
      <View style={{flex:1}}>
        <Modal 
          style={{margin:0}} 
          animationIn="slideInRight" 
          isVisible={isFilterModalOpen} 
          onBackdropPress={closeFilterModal}
          animationOut={"slideOutRight"}
          backdropOpacity={0.2}
        >
        <View style={{
          width:"70%",
          height:"100%",
          borderTopLeftRadius:50,
          borderBottomLeftRadius:20,
          backgroundColor:"white",
          alignSelf:"flex-end",
          padding:16
        }}>
          <View style={{flex:0.15,justifyContent:"center"}}>
            <Header 
              onFilterPress={closeFilterModal} 
              title='Filters'
              isFilter={false}
            />
          </View>
          <View style={{flex:0.85,paddingVertical:10}}>
            <View>
              <Text style={{
                fontSize:16,
                fontWeight:"600",
                color:COLORS.primary,
                marginBottom:15
              }}>Order Status</Text>

              <View style={{flexDirection:"row",alignItems:"center"}}>
                <CheckBox
                  onClick={()=>{}}
                  isChecked={true}
                  rightText=' '
                  checkBoxColor={COLORS.primary}
                />
                <Dropdown 
                  open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    dropDownContainerStyle={{
                      borderColor:COLORS.borderColor,
                      width:"85%",
                      marginHorizontal:10,
                      marginRight:-20,
                    }}
                    style={{
                      marginHorizontal:10,
                      width:"85%",
                      borderColor:COLORS.borderColor
                    }}
                    textStyle={{
                      fontSize:14,
                      fontWeight:"600",
                      color:"black",
                    }}
                    placeholder="Ready for Pick"
                />
              </View>
              
            </View>
            <View style={{paddingTop:20}}>
              <Text style={{
                fontSize:16,
                fontWeight:"600",
                color:COLORS.primary,
                marginBottom:15
              }}>Pay Status</Text>
              
              <View style={{flexDirection:"row",alignItems:"center"}}>
                  <CheckBox
                    onClick={()=>{}}
                    isChecked={true}
                    rightText=' '
                    checkBoxColor={COLORS.primary}
                  />
                <Dropdown 
                  open={openPayStatus}
                  value={payStatusValue}
                  items={payStatusItems}
                  setOpen={setOpenPayStatus}
                  setValue={setPayStatusValue}
                  setItems={setPayStatusItems}
                  dropDownContainerStyle={{
                    borderColor:COLORS.borderColor,
                    width:"85%",
                    marginHorizontal:10,
                    marginRight:-20,
                  }}
                  style={{
                    marginHorizontal:10,
                    width:"85%",
                    borderColor:COLORS.borderColor
                  }}
                  textStyle={{
                    fontSize:14,
                    fontWeight:"600",
                    color:"black",
                  }}
                  placeholder="Cash on Delivery"
                />
              </View>
              
            </View>
          </View>
        </View>
      </Modal>
      </View>
    )
  }

  return (
    <Container containerStyle={styles.containerStyle}>
      <View style={styles.topSection}>
        {renderHeader()}

        {renderSearchField()}
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.pendingOrdersText}>New Pending Orders</Text>
        {renderOrdersList()}
      </View>

      {renderFilterModal()}
    </Container>
  );
};



export default HomeScreen;
