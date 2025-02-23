import { StyleSheet } from "react-native";
import { COLORS } from "../../constant/constant";

export const styles = StyleSheet.create({
    containerStyle: {
        flex:1,
      paddingBottom: 0,
    },
    topSection: {
      height:"20%",
      justifyContent:"space-evenly"
    },
    bottomSection: {
      height:"80%",
      paddingTop: 10,
    },
    headerContainer: {
      flex:0.5,
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
    //   backgroundColor:"red"
    },
    orderItemContainer: {
      width: '100%',
      height: 90,
      flexDirection: 'row',
      marginVertical: 10,
      // backgroundColor:"red"
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
      paddingVertical: 5,
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