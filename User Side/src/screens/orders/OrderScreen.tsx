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
import { addSelectedOrderDetails } from '../../redux/dataSlice'
import CheckBox from 'react-native-check-box'
import DropDownPicker from 'react-native-dropdown-picker'

const OrderScreen = () => {

  const navigation  = useNavigation()
  const [token, setToken] = useState("")
  const [orderData, setOrderData] = useState([])
  const dispatch = useDispatch()
  const [message, setMessage] = useState("")
   const [openPayStatus, setOpenPayStatus] = useState(false)
    const [payStatusValue, setPayStatusValue] = useState(null)
    const [payStatusItems, setPayStatusItems] = useState([
      { label: 'Cash on Delivery', value: 'Cash on Delivery' },
      { label: 'Paid', value: 'Paid' },
      // { label: 'Ready for Pick', value: 'Ready for Pick' }
    ]);
      const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
      const [open, setOpen] = useState(false);
        const [value, setValue] = useState(null);
        const [items, setItems] = useState([
          { label: 'Ready for Pick', value: 'Ready for Pick' },
          { label: 'In Progress', value: 'In Progress' },
          { label: 'Received', value: 'Received' }
        ]);
      

  useEffect(()=>{
    getToken()
  },[token])

  useEffect(()=>{
    fetchAllOrders()
  },[token])
  

  const getToken = async () =>{
    let token = await getUserToken()
    // console.log("token =>",token)
    setToken(token)
  }

  const fetchAllOrders = async () =>{
    let url = PROVIDER_URLS.GET_MY_ORDERS
    let { result } = await makeGetApiCall(url,token)
    console.log("orders ===>",result)
    if(result.data.length === 0){
      setMessage("No Order Available")
    }
    setOrderData(result?.data)
  }
  

  const navigateToOrderDetails = (details:any) =>{
    dispatch(addSelectedOrderDetails(details))
    navigation.navigate("OrderDetailScreen")
  }

  const renderOrderStatusBasedOnCode = (status:string,item:any) =>{
    switch (status) {
      case "Ready For Pickup":
      return(
        <Text style={styles.orderReadyStatusStyle}>{status}</Text>
      )
      case "Pending":
        return(
          <Text style={styles.orderInprogressStatusStyle}>{status}</Text>
        )
      case "Received":
        return(
          <Text style={styles.orderRecivedStatusStyle}>{status}</Text>
        )
      default:
        return(<Text>Un</Text>);
    }
  }

  const renderOrderItem = ({item}) =>{
    // console.log("item ====<>",JSON.parse(item?.services_details?.service_details))

    const details = {
      date_time:new Date(item?.updated_at).toLocaleString(),
      order_id: item?.order_id || "123",
      address:item?.address?.address,
      lock_code:item?.lock_code || "5789",
      shop_name:item?.shop_name,
      services_details:JSON.parse(item?.services_details?.service_details),
      total_price:item?.total_price || "180.00",
      order_status:"Pending",
      payment_status:"Paid"
    }

    return(
      <TouchableOpacity onPress={()=>navigateToOrderDetails(details)} style={styles.orderItemContainer}>
        <View style={styles.orderItemHeader}>
          <Text style={styles.orderDateText}>{details?.date_time}</Text>
          {renderOrderStatusBasedOnCode(details?.order_status,item)}
        </View>
        <View style={styles.orderItemFooter}>
          <View style={styles.orderDetailsContainer}>
            <Text style={styles.orderIdText}>OID {details?.order_id}</Text>
            <Text style={styles.lockCodeText}>Lock Code - {details?.lock_code}</Text>
          </View>
          <View style={styles.paymentContainer}>
            <Text style={styles.paymentStatus}>{details?.payment_status}</Text>
            <View style={styles.rowRupee}>
              <Image source={ICONS.rupees} style={styles?.rupeesIcon}/>
              <Text style={styles.paymentAmount}>{details?.total_price}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
            {/* <Header 
              // onFilterPress={closeFilterModal} 
              onBackPress={closeFilterModal}
              title='Filters'
            /> */}
            <Text style={{alignSelf:"center",fontSize:26,fontWeight:"700"}}>Filters</Text>
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
                <DropDownPicker
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
                <DropDownPicker
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
    <Container>
      <Header onFilterPress={openFilterModal} title='Orders' isFilter={true} />
      
      <View>
        <Text style={styles.activeOrdersText}>6 Active Orders</Text>
      </View>

      {
        message.length > 0 ? (
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
              <Text style={{fontSize:16,color:"black",fontWeight:"600"}}>{message}</Text>
            </View>
        ) : (
          <FlatList data={orderData} scrollEnabled={true} renderItem={(item)=>renderOrderItem(item)} />
        )
      }

      {renderFilterModal()}
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
    flex: 0.6,
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
    flex: 0.4,
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
    color: COLORS.primary,
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