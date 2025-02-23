import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../../component/view/Container'
import Header from '../../component/header/Header'
import { COLORS, ICONS, IMAGES, NotificationData, USERS } from '../../constant/constant'
import { useNavigation } from '@react-navigation/native'
import { getUserToken, makeGetApiCall } from '../../utils/helper'
import { PROVIDER_URLS } from '../../utils/config'
import { useDispatch } from 'react-redux'
import { addSelectedOrderDetails, addSelectedUserData } from '../../redux/dataSlice'

const NotificationScreen = () => {

    const navigation = useNavigation()
    const [notificationList, setNotificationList] = useState([])
    const [token, setToken] = useState("")
    const dispatch = useDispatch()
    const [message, setMessage] = useState("")

    useEffect(()=>{
        getToken()
        getAllNotifications()
    },[token])

    const getToken = async () =>{
        let token = await getUserToken()
        setToken(token)
    }

    const getAllNotifications = async () =>{
        let url = PROVIDER_URLS.GET_USER_NOTIFICATION
        let {result} = await makeGetApiCall(url,token)
        setNotificationList(result.data)
        if(result?.data?.length===0){
            setMessage(result?.message)
        }
    }

    const navigateToOrderDetails = (item:any) =>{
        dispatch(addSelectedUserData(item?.user))
        dispatch(addSelectedOrderDetails(item?.order))
        navigation.navigate("OrderDetailScreen")
    }

    const renderNotificationsItem = (item:any) =>{
        const details = {
            message:item?.notification_message || "Message not available",
            name:item?.user?.name || "User",
            date:new Date(item?.order?.updated_at).toLocaleDateString(),
            time:new Date(item?.order?.updated_at).toLocaleTimeString([],{
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }),
        }
        return(
            <View style={styles.notificationCard}>
                <View style={styles.rowContainer}>

                    <View style={styles.iconContainer}>
                        <Image source={ICONS.picking_box} style={styles.icon} />
                    </View>

                    <View style={styles.textContainer}>
                        <View style={styles.titleRow}>
                            <Text style={styles.title}>An Order received</Text>
                        </View>
                        <View style={styles.userRow}>
                            <Image source={USERS.user1} style={styles.userImage} />
                            <Text style={styles.userName}>{details.name}</Text>
                        </View>
                    </View>

                    <View style={styles.timeContainer}>
                        <Text style={styles.timeText}>{details.date}</Text>
                        <Text style={styles.timeText}>{details.time}</Text>
                    </View>

                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={()=>navigateToOrderDetails(item)} style={styles.detailsButton}>
                        <Text style={styles.detailsButtonText}>See Details</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

  return (
    <Container containerStyle={{paddingBottom:0}}>

        <Header title='Notifications' />

        {
            message.length > 0 ? (
              <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize:16,color:"black",fontWeight:"600"}}>{message}</Text>
              </View>
            ): (
                <FlatList
                data={notificationList}
                contentContainerStyle={styles.flatListContainer}
                renderItem={({item})=>renderNotificationsItem(item)}
            />
            )
        }

       
    </Container>
  )
}

const styles = StyleSheet.create({
    flatListContainer: {
        paddingTop: 20,
    },
    notificationCard: {
        width: "100%",
        height: 135,
        backgroundColor: "#F1F1F1",
        marginVertical: 10,
        borderRadius: 8,
    },
    rowContainer: {
        flex: 0.6,
        flexDirection: "row",
    },
    iconContainer: {
        flex: 0.2,
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: "contain",
    },
    textContainer: {
        flex: 0.6,
    },
    titleRow: {
        flex: 0.5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: 16,
        fontWeight: "500",
    },
    userRow: {
        flex: 0.5,
        flexDirection: "row",
        alignItems: "center",
    },
    userImage: {
        width: 30,
        height: 30,
        borderRadius: 30,
        resizeMode: "contain",
    },
    userName: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.black,
        marginHorizontal: 10,
    },
    timeContainer: {
        flex: 0.2,
        justifyContent: "space-evenly",
        alignItems: "flex-end",
        paddingHorizontal: 10,
    },
    timeText: {
        fontSize: 14,
        fontWeight: "600",
    },
    buttonContainer: {
        flex: 0.4,
        alignItems: "center",
        paddingTop: 10,
    },
    detailsButton: {
        width: "90%",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.primary,
        borderRadius: 5,
    },
    detailsButtonText: {
        fontSize: 14,
        fontWeight: "700",
        color: COLORS.white,
    },
})

export default NotificationScreen;
