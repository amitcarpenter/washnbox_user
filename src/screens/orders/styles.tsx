import { StyleSheet } from "react-native";
import { COLORS } from "../../constant/constant";


export const styles = StyleSheet.create({
    containerStyle: {
      paddingBottom: 0,
    },
    clothsTypeItemStyle:{
      width:"96%",
      height:60,
      borderRadius:10,
      backgroundColor:"#F3FAFF",
      alignSelf:"center",
      marginTop:20,
      paddingLeft:16,
      justifyContent:"center"
    },
    clothsTypeSelectedItemStyle:{
      width:"96%",
      height:60,
      borderRadius:10,
      backgroundColor:"#F3FAFF",
      alignSelf:"center",
      marginTop:20,
      paddingLeft:16,
      justifyContent:"center",
      borderWidth:2,
      borderColor:COLORS.primary
    },
    callText:{
      fontWeight:"600",
      color:COLORS.primary,
    },
    callIconImage:{
      width:14,
      right:14,
      resizeMode:"contain",
    },
    callIconButton:{
      width:90,
      height:40,
      borderRadius:12,
      borderWidth:1,
      borderColor:COLORS.primary,
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center"
  },
    lockboxText:{fontSize:16,fontWeight:"700",color:COLORS.black},
    lockboxAndCallIconContainer:{minHeight:"5%",paddingTop:10, flexDirection:"row",justifyContent:"space-between",alignItems:"center"},
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
      zIndex:20
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
      justifyContent:"space-around",
      // alignItems:"center",
      paddingHorizontal:30,
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
      minHeight: "15%",
      flexDirection: 'row',
      marginVertical: 0,
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
      flex: 0.7,
      justifyContent: 'center',
      paddingLeft: 16,
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
      marginTop:6
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
      flex: 0.1,
    },
    priceRow: {
      flexDirection: 'row',
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
    scrollViewContainer: {
      flexGrow: 1,
      padding: 16,
      backgroundColor:COLORS.white
    },
    profileContainer: {
      justifyContent: "center",
      alignItems: "center",
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
      position: "absolute",
      bottom: 0,
      right: 0,
    },
    cameraIcon: {
      width: 50,
      height: 50,
      resizeMode: "contain",
    },
    inputContainer: {
      marginTop: 20,
    },
    labelStyle: {
      color: COLORS.primary,
      fontSize: 16,
      marginBottom: 8,
      fontWeight:"600"
    },
    locationContainer: {
      marginTop: 20,
      // alignSelf:"flex-start"
    },
    locationLabel: {
      color: COLORS.primary,
      fontSize: 16,
      lineHeight: 16,
      fontWeight: "600",
      marginBottom: 18,
    },
    mapImage: {
      // width: "100%",
      alignSelf: "center",
      // borderRadius: 12,
    },
    addressText: {
      fontSize: 16,
      lineHeight: 24,
      marginTop: 10,
    },
    updateButton: {
      marginTop:20,
    },
    phoneInputStyle:{
      width:"100%",
      height:55,
      borderRadius:12,
      borderWidth:1,
      borderColor:COLORS.borderColor,
      // paddingHorizontal:16,
      fontSize:16,
      fontWeight:"500",
      marginTop:8
    },
    checkBoxTextContainer:{
      width:"100%",
      height:40,
      justifyContent:"center",
      paddingLeft:10
    },
    checkBoxText:{
      fontSize:16,
      fontWeight:'500',
      color:COLORS.black,
      lineHeight:17
    },
    card: {
      width: "100%",
      height: 146,
      borderRadius: 10,
      backgroundColor: "#E7E7E7",
      marginTop:16
    },
    itemTitle: {
      fontSize: 20,
      fontWeight: "600",
      color: "black",
    },
    deleteIcon: {
      width: 24,
      height: 24,
      resizeMode: "contain",
    },
    detailsContainer: {
      flex: 0.65,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    serviceBox: {
      width: 120,
      height: 80,
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    input: {
      borderWidth: 1,
      width: 90,
      borderRadius: 10,
      borderColor: "#D0D0D0",
      textAlign: "center",
      fontSize: 20,
      fontWeight: "600",
    },
    bottomSheetTimeSlotContainer:{
      height: "70%",
      borderWidth: 0.5,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
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
      width:"94%",
      height:60,
      backgroundColor: '#F3FAFF',
      alignSelf:"center",
      marginTop:15,
      justifyContent:"center",
      paddingLeft:20,
      borderRadius:15
    },
    clothsTypeSelectedListItemStyle: {
      width:"94%",
      height:60,
      backgroundColor: "#F3FAFF",
      borderWidth:2,
      borderColor:COLORS.primary,
      alignSelf:"center",
      marginTop:15,
      justifyContent:"center",
      paddingLeft:20,
      borderRadius:15
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
