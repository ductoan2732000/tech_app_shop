import React, { useEffect, useState } from "react";
import { Text, ToastAndroid, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { user } from "src/model/user";
import tss from "app/api/tss";
import { callApi } from "app/api/constant";
import { order } from "app/model/order";
import Order from "app/components/atoms/Order";

const ListOrder = () => {
  const [idShop, setIdShop] = useState(-1);
  const [listOrder, setListOrder] = useState<order[]>([]);
  useEffect(() => {
    try {
      AsyncStorage.getItem("@user").then((res: any) => {
        const data: user = JSON.parse(res);
        setIdShop(data.id_shop);
      });
    } catch (error: any) {
      ToastAndroid.showWithGravityAndOffset(
        error.toString(),
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
    try {
      tss.get(callApi.order.getOrderByShop).then((res) => {
        setListOrder(res.data.data);
        console.log(listOrder);
      });
    } catch (error: any) {
      ToastAndroid.showWithGravityAndOffset(
        error.response.data.data,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
  }, []);
  const clickOrder = (value: any) => {
    console.log(value);
  };
  return (
    <View>
      {listOrder.map((item) => {
        return (
          <Order key={item.id} data={item} clickOrder={clickOrder}></Order>
        );
      })}
    </View>
    // <Text>{idShop}</Text>
  );
};
export default ListOrder;
