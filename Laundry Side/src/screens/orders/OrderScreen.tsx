import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../../component/view/Container'
import Header from '../../component/header/Header'
import { COLORS, ICONS, OrderItems } from '../../constant/constant'
import { useNavigation } from '@react-navigation/native'
import Modal from "react-native-modal"
import { getUserToken, makeGetApiCall } from '../../utils/helper'
import { PROVIDER_URLS } from '../../utils/config'
import { useDispatch } from 'react-redux'
import { addSelectedOrderDetails, addSelectedUserData } from '../../redux/dataSlice'

const OrderScreen = () => {

  const navigation  = useNavigation()
  const [token, setToken] = useState('')
  const [orderList, setOrderList] = useState([])
  const dispatch = useDispatch()


  useEffect(()=>{
    getToken()
    fetchAllOrders()
  },[token])
 
  const getToken = async () =>{
    let token = await getUserToken()
    // console.log("token =>",token)
    setToken(token)
  }
   
  const fetchAllOrders = async () =>{
    let url = PROVIDER_URLS.GET_PROVIDER_ACTIVE_ORDERS
    let response = await makeGetApiCall(url,token)
    setOrderList(response.result.data)
    // console.log("response =",response.result)
  }
   
  const navigateToOrderDetails = (item:any) =>{
    dispatch(addSelectedUserData(item?.user))
    dispatch(addSelectedOrderDetails(item))
    navigation.navigate("OrderDetailScreen")
  }

  const renderOrderStatusBasedOnCode = (status:string,item:any) =>{
    switch (status) {
      case "Ready For Pickup":
      return(
        <Text style={styles.orderReadyStatusStyle}>{item?.order_status}</Text>
      )
      case "Pending":
        return(
          <Text style={styles.orderInprogressStatusStyle}>{status}</Text>
        )
      case "Recived":
        return(
          <Text style={styles.orderRecivedStatusStyle}>{item?.order_status}</Text>
        )
      default:
        return(<Text>unavailable</Text>);
    }
  }

  const renderOrderItem = ({item}) =>{
    console.log("item ====>",item)
    return(
      <TouchableOpacity onPress={()=>navigateToOrderDetails(item)} style={styles.orderItemContainer}>
        <View style={styles.orderItemHeader}>
          <Text style={styles.orderDateText}>{new Date(item?.updated_at).toLocaleString()}</Text>
          {renderOrderStatusBasedOnCode(item?.status,item)}
        </View>
        <View style={styles.orderItemFooter}>
          <View style={styles.orderDetailsContainer}>
            <Text style={styles.orderIdText} ellipsizeMode='tail'>OID: {item?.order_id}</Text>
            <Text style={styles.lockCodeText} ellipsizeMode='tail'>Lock Code - {item?.lockbox?.code}</Text>
          </View>
          <View style={styles.paymentContainer}>
            <Text style={styles.paymentStatus}>{item?.order_payment?.payment_method}</Text>
            <View style={styles.rowRupee}>
              <Image source={ICONS.rupees} style={styles?.rupeesIcon}/>
              <Text style={styles.paymentAmount} ellipsizeMode='tail'>{item?.total_price}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <Container>
      <Header title='Orders' isFilter={true} />
      
      <View>
        <Text style={styles.activeOrdersText}>6 Active Orders</Text>
      </View>

      <FlatList 
        data={orderList} 
        scrollEnabled={true} 
        renderItem={(item)=>renderOrderItem(item)} 
      />

    </Container>
  )
}

const styles = StyleSheet.create({
  activeOrdersText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.black,
    marginVertical: 20
  },
  orderItemContainer: {
    width: "100%",
    height: 90,
    borderRadius: 8,
    backgroundColor: COLORS.orderItemBackgroundColor,
    marginVertical: 10,
    paddingVertical: 8
  },
  orderItemHeader: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  orderDateText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.black
  },
  orderReadyStatusStyle: {
    backgroundColor: "#00A013",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 10,
    color: COLORS.white,
    fontWeight: "600"
  },
  orderInprogressStatusStyle:{
    backgroundColor: "#C8C80A",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 10,
    color: COLORS.white,
    fontWeight: "600",

  },
  orderRecivedStatusStyle:{
    backgroundColor: "#FF5E18",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 10,
    color: COLORS.white,
    fontWeight: "600"
  },
  orderItemFooter: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  orderDetailsContainer: {
    flex: 0.5,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10
  },
  orderIdText: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 22
  },
  lockCodeText: {
    color: COLORS.black,
    fontWeight: "600",
    backgroundColor: "#D4D4D4",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6
  },
  paymentContainer: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingLeft:10,
    paddingHorizontal: 10
  },
  paymentStatus: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 22,
    // color: COLORS.primary,
    // paddingLeft: 20
  },
  paymentAmount: {
    fontWeight: "700",
    color: "black",
    fontSize: 18,
    lineHeight: 22
  },
  rowRupee:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  },
  rupeesIcon: {
    width: 10,
    height: 10,
    resizeMode: "contain",
  }
})

export default OrderScreen;