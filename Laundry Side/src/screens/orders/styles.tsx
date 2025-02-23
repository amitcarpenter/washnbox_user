import { StyleSheet } from "react-native";
import { COLORS } from "../../constant/constant";


export const styles = StyleSheet.create({
    containerStyle: {
      paddingBottom: 0,
    },
    grayoutlineButtonStyle:{
      backgroundColor:"#9B9B9B",
      borderWidth:0
    },
    callText:{fontWeight:"600",color:COLORS.white},
    callIconImage:{width:14,right:14,resizeMode:"contain"},
    callIconButton:{
      width:90,
      height:40,
      borderRadius:12,
      backgroundColor:
      COLORS.primary,
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center"
  },
    lockboxText:{fontSize:16,fontWeight:"700",color:COLORS.black},
    lockboxAndCallIconContainer:{flex:0.1,flexDirection:"row",justifyContent:"space-between",alignItems:"center"},
    outlineButtonText:{fontSize:17,lineHeight:18,color:COLORS.primary,fontWeight:"600"},
    outlinedButtonStyle:{
      width:"100%",
      height:52,
      borderRadius:8,
      justifyContent:"center",
      alignItems:"center",
      borderWidth:1,
      borderColor:COLORS.primary,
      marginTop:10
      },
    quantityContainer2:{width:70,height:32,justifyContent:"center",alignItems:"center",backgroundColor:COLORS.primary,borderRadius:8},
    quantityContainer:{flex:0.5,justifyContent:"center",alignItems:"center"},
    priceText:{
      fontSize:20,
      color:COLORS.primary,
      fontWeight:"600"
    },
    priceAndQuantityContainer:{flex:0.5,flexDirection:"row",justifyContent:"space-evenly",alignItems:"center"},
    dropDownTextStyle:{
      fontSize:14,
      fontWeight:"600",
      color:"black",
      paddingHorizontal:10
    },
    dropDownContainerStyle:{
      width:"85%",
      borderColor:COLORS.borderColor,
      borderRadius:20,
      marginTop:10,
      // paddingHorizontal:10
    },
    serviceItemNameText:{fontSize:20,lineHeight:24,color:COLORS.black,fontWeight:"700"},
    serviceItemTextAndQuantityContainer:{flex:0.8,justifyContent:"space-around",alignItems:"flex-start"},
    serviceItemContainer:{
      width:"100%",
      height:120,
      backgroundColor:COLORS.orderItemBackgroundColor,
      marginVertical:10,
      borderRadius:8,
      flexDirection:"row",
      paddingVertical:14,
      paddingHorizontal:16
    },
    crossIconContainer:{
      justifyContent:"center",
      alignItems:"center",
      position:"absolute",
      top:10,
      right:10
    },
    orderTextStyle:{fontSize:14,fontWeight:"500",color:COLORS.white},
    orderButtonStyle:{
      width:"48%",
      height:48,
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:COLORS.primary,
      borderRadius:8
    },
    cancelButtonText:{fontSize:14,fontWeight:"500"},
    cancelButtonStyle:{
      width:"48%",
      height:48,
      justifyContent:"center",
      alignItems:"center",
      borderWidth:1,
      borderColor:'gray',
      borderRadius:8
    },
    modalButtonsContainer:{flex:0.3,flexDirection:"row",justifyContent:"space-between",alignItems:"center"},
    modalText:{fontSize:18,fontWeight:"700",color:COLORS.black,marginTop:10},
    modalImageStyle: {width:66,height:66,resizeMode:"contain"},
    modalImageContainer:{width:106,height:106,borderRadius:106,backgroundColor:"#FFEA9F",justifyContent:"center",alignItems:"center"},
    modalImageAndTextContainer:{flex:0.7,justifyContent:"center",alignItems:"center"},
    modalBoxContainer:{width:"96%",height:300,borderRadius:16,backgroundColor:COLORS.white,padding:16},
    modalContainer:{flex:1,justifyContent:"center",alignItems:"center",padding:16},
    bottomModalButtonContainer:{
      width:"100%",
      height:"10%",
      backgroundColor:"white",
      position:"absolute",
      bottom:0,
      justifyContent:"center",
      alignItems:"center",
      paddingHorizontal:16,
      borderTopLeftRadius:25,
      borderTopRightRadius:25,
      elevation:10,
      shadowOpacity:0.9,shadowColor:"black",shadowOffset:{width:0,height:10}
    },
    topSection: {
      width: '100%',
      height: '15%',
    },
    bottomSection: {
      width: '100%',
      height: '85%',
      paddingTop: 10,
    },
    headerContainer: {
      width: '100%',
      height: '50%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      width: 45,
      height: 50,
      resizeMode: 'contain',
    },
    laundryLogo: {
      width: '45%',
      height: 29,
    },
    notificationIcon: {
      width: 26,
      height: 26,
      resizeMode: 'contain',
    },
    filterButton: {
      width: 52,
      height: 52,
      borderRadius: 12,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: COLORS.borderColor,
    },
    filterIcon: {
      width: 22,
      height: 22,
      resizeMode: 'center',
    },
    searchContainer: {
      width: '100%',
      height: '50%',
      justifyContent: 'center',
    },
    searchField: {
      width: '100%',
      height: 60,
      backgroundColor: COLORS.search_field_color,
      borderRadius: 50,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: COLORS.borderColor,
    },
    searchIcon: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
      marginHorizontal: 12,
    },
    searchInput: {
      flex: 1,
    },
    pendingOrdersText: {
      fontSize: 16,
      fontWeight: '700',
      color: COLORS.black,
      lineHeight: 19,
    },
    listContainer: {
      paddingTop: 20,
      paddingBottom: 40,
    },
    orderItemContainer: {
      width: '100%',
      height: "10%",
      flexDirection: 'row',
      marginVertical: 30,
    },
    imageContainer: {
      flex: 0.2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    orderImage: {
      width: 80,
      height: 80,
      borderRadius: 12,
      resizeMode: 'contain',
    },
    orderDetails: {
      flex: 0.55,
      justifyContent: 'space-around',
      paddingLeft: 12,
    },
    orderName: {
      fontSize: 16,
      fontWeight: '700',
      color: 'black',
      lineHeight: 19,
    },
    orderDateTime: {
      fontSize: 14,
      fontWeight: '600',
      color: COLORS.black,
      lineHeight: 20,
    },
    servicesContainer: {
      flexDirection: 'row',
    },
    serviceText: {
      backgroundColor: '#FFF3FA',
      color: COLORS.black,
      fontWeight: '500',
      fontSize: 14,
      padding: 4,
      paddingHorizontal: 10,
      marginHorizontal: 5,
      borderRadius: 5,
    },
    priceContainer: {
      flex: 0.25,

    },
    priceRow: {
      // flex:1,
      flexDirection: 'row',
      justifyContent:"flex-end",
      alignItems: 'center',
    },
    rupeesIcon: {
      width: 10,
      height: 12,
      resizeMode: 'contain',
    },
    orderPrice: {
      fontSize: 18,
      fontWeight: '700',
      color: 'black',
    },
});