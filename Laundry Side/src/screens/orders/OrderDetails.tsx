import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, FlatList } from 'react-native'
import React, { useState } from 'react'
import Container from '../../component/view/Container'
import Header from '../../component/header/Header'
import { COLORS, ICONS, IMAGES, USERS } from '../../constant/constant'
import Button from '../../component/button/Button'
import DropDownPicker from 'react-native-dropdown-picker'
import { styles } from './styles'
import { useSelector } from 'react-redux'

const OrderDetails = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Ready for Pick', value: 'Ready for Pick' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Received', value: 'Received' }
  ]);

  const userData = useSelector(state => state.data.selectedUser);
  const orderDetails = useSelector(state => state.data.selectedOrderDetails);
  const [orderItems, setOrderItems] = useState(orderDetails?.item_details || []);
  const [status, setStatus] = useState("")
  const [statusCode, setStatusCode] = useState(0)

  const increaseCount = (index:number) => {
    setOrderItems(prevItems =>
      prevItems.map((item:any, i:number) =>
        i === index ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  const decresCount = (index:number) => {
    setOrderItems(prevItems =>
      prevItems.map((item:any, i:number) =>
        i === index && (item.quantity || 1) > 1 ? { ...item, quantity: (item.quantity || 1) - 1 } : item
      )
    );
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const cancelModal = () => {
    setIsModalVisible(false);
  };

  const updateStatus = () =>{
    if (statusCode > 2) setStatusCode(0)

    switch (statusCode) {
      case 0:
        return(
          <TouchableOpacity activeOpacity={0.8} onPress={()=>setStatusCode(statusCode+1)} style={styles.outlinedButtonStyle}>
            <Text style={styles.outlineButtonText}>Start Work</Text>
          </TouchableOpacity>
        )
      case 1:
        return(
          <TouchableOpacity activeOpacity={0.8}  style={[styles.outlinedButtonStyle,styles.grayoutlineButtonStyle]}>
            <Text  style={[styles.outlineButtonText,{color:"white"}]}>Work Started</Text>
          </TouchableOpacity>
        )
      case 2:
        return(
          <TouchableOpacity activeOpacity={0.8} style={[styles.outlinedButtonStyle,styles.grayoutlineButtonStyle]}>
            <Text style={[styles.outlineButtonText,{color:"white"}]}>Order Completed</Text>
          </TouchableOpacity>
        )
    
      default:
        return(
          <TouchableOpacity activeOpacity={0.8} style={styles.outlinedButtonStyle}>
            <Text style={styles.outlineButtonText}>Start Work</Text>
          </TouchableOpacity>
        )
        
    }
  }

  const completeWork = () =>{
    setStatusCode(statusCode+1)
    setIsModalVisible(false)
  }

  const renderModal = () => {
    return (
      <Modal
        statusBarTranslucent
        visible={isModalVisible}
        backdropColor={"rgba(0,0,0,0.1)"}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBoxContainer}>
            <View style={styles.modalImageAndTextContainer}>
              <View style={styles.modalImageContainer}>
                <Image source={IMAGES.success} style={styles.modalImageStyle} />
              </View>
              <Text style={styles.modalText}>Work done Successful!</Text>
            </View>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.cancelButtonStyle} onPress={cancelModal}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={completeWork} style={styles.orderButtonStyle}>
                <Text style={styles.orderTextStyle}>Order Completed</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.crossIconContainer} onPress={cancelModal}>
              <Image source={ICONS.cancel} style={{ width: 28, height: 28 }} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const renderServices = ({ item, index }:{item:any,index:number}) => {
    return (
      <View style={styles.serviceItemContainer}>
        <View style={styles.serviceItemTextAndQuantityContainer}>
          <Text style={styles.serviceItemNameText}>{item?.item_name}</Text>
          <DropDownPicker
            disabled={true}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            style={styles.dropDownContainerStyle}
            textStyle={styles.dropDownTextStyle}
            placeholder="Iron  $3/unit"
          />
        </View>

        <View style={{ flex: 0.2 }}>
          <View style={styles.priceAndQuantityContainer}>
            <Text style={styles.priceText}>$ {item.quantity*2}</Text>
          </View>
          <View style={styles.quantityContainer}>
            <View style={styles.quantityContainer2}>
              <Text style={{ fontSize: 16, fontWeight: "600", color: COLORS.white }}>
                <Text onPress={() => decresCount(index)}> - </Text>
                {" "} {item.quantity || 1} {" "}
                <Text onPress={() => increaseCount(index)}> + </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <Container containerStyle={{ paddingBottom: 0 }}>
        <Header title='Order Details' isFilter={false} />

        <View style={styles.orderItemContainer}>
          <View style={styles.imageContainer}>
            <Image source={USERS.user1} style={styles.orderImage} />
          </View>
          <View style={styles.orderDetails}>
            <Text style={styles.orderName}>{userData?.name}</Text>
            <Text style={styles.orderDateTime}>{orderDetails?.updated_at}</Text>
            <View style={styles.servicesContainer}>
              {orderDetails?.item_details?.map((service:any, index:number) => (
                <Text key={index} style={styles.serviceText} ellipsizeMode='tail'>
                  {service?.item_name}
                </Text>
              ))}
            </View>
          </View>
          <View style={styles.priceContainer}>
            <View style={styles.priceRow}>
              <Image source={ICONS.rupees} style={styles.rupeesIcon} />
              <Text style={styles.orderPrice}>{orderDetails?.total_price}</Text>
            </View>
          </View>
        </View>

        <View style={{ width: "100%", height: "80%" }}>
          <View style={styles.lockboxAndCallIconContainer}>
            <Text style={styles.lockboxText}>Lock box drop off</Text>
            <TouchableOpacity style={styles.callIconButton}>
              <Image source={ICONS.phone} style={styles.callIconImage} />
              <Text style={styles.callText}>Call</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 0.5, paddingTop: 10 }}>
            <FlatList
              data={orderItems}
              contentContainerStyle={{ marginBottom: "30%" }}
              ListFooterComponent={updateStatus()}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderServices}
            />
          </View>
        </View>
      </Container>

      {
        statusCode < 2 && (
          <View style={styles.bottomModalButtonContainer}>
            <Button onPress={showModal} title='Complete the work' />
          </View>
        )
      }

      {renderModal()}
    </View>
  );
};

export default OrderDetails;
