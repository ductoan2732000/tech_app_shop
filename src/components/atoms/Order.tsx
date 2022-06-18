import { callApi } from "app/api/constant";
import {
  PAYMENT_METHOD,
  SHIPPING_METHOD,
  STATUS,
} from "app/api/constant/order";
import tss from "app/api/tss";
import { order } from "app/model/order";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { isTabletMode } from "react-native-device-info";

interface propsOrder {
  data: order;
  clickOrder: Function;
}

const Order = (props: propsOrder) => {
  const clickOrder = () => {
    props.clickOrder(props);
  };
  const [status, setStatus] = useState(props.data.status)
  const changeStatus = async (value: number) => {
    const script = callApi.order.updateStatus;
    console.log(script);
    const param = {
      id: props.data.id.toString(),
      status: value.toString(),
    };
    console.log(param);
    // const res = await tss.put(script, param);
    // console.log(res.data);
    setStatus(value);
  };
  return (
    <View style={styles.order}>
      <TouchableOpacity onPress={clickOrder} style={styles.contant}>
        {JSON.parse(props.data.list_product).map((item: any) => {
          return (
            <Text>
              {item.id}: {item.name}
            </Text>
          );
        })}
        <View style={styles.info}>
          <Text>
            Shipping method:
            {SHIPPING_METHOD.find(
              (x: any) => x.id === props.data.shiping_method
            )
              ? SHIPPING_METHOD.find(
                  (x: any) => x.id === props.data.shiping_method
                )?.name
              : ""}
          </Text>
          <Text>
            Payment method:
            {PAYMENT_METHOD.find((x: any) => x.id === props.data.payment_method)
              ? PAYMENT_METHOD.find(
                  (x: any) => x.id === props.data.payment_method
                )?.name
              : ""}
          </Text>
          <Text>Total money: {props.data.total_money} $</Text>

          <Text>
            Current Status:
            {STATUS.find((x: any) => x.id === status)
              ? STATUS.find((x: any) => x.id === status)?.name
              : ""}
          </Text>
          <View style={styles.status}>
            <TouchableOpacity
              style={styles.butonIm}
              onPress={() => changeStatus(1)}
            >
              <Image
                style={styles.statusImage}
                source={require("src/assets/icon/status1.png")}
              />
              <Text style={styles.textImage}>Chờ xác nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.butonIm}
              onPress={() => changeStatus(2)}
            >
              <Image
                style={styles.statusImage}
                source={require("src/assets/icon/status2.png")}
              />
              <Text style={styles.textImage}>Chờ lấy hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.butonIm}
              onPress={() => changeStatus(3)}
            >
              <Image
                style={styles.statusImage}
                source={require("src/assets/icon/status3.png")}
              />
              <Text style={styles.textImage}>Đang giao</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.butonIm}
              onPress={() => changeStatus(4)}
            >
              <Image
                style={styles.statusImage}
                source={require("src/assets/icon/status4.png")}
              />
              <Text style={styles.textImage}>Đã giao</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default Order;
const styles = StyleSheet.create({
  order: {
    width: "90%",
    height: 230,
    marginLeft: "5%",
    marginTop: 20,
  },
  contant: {
    flex: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  info: {
    width: "90%",
    borderRadius: 10,
    padding: 4,
    borderColor: "green",
    borderWidth: 2,
    alignContent: "space-between",
    marginTop: 5,
  },
  status: {
    width: "100%",
    flexDirection: "row",
    marginTop: 10,
  },
  butonIm: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
  },
  statusImage: {
    width: 40,
    height: 40,
  },
  textImage: {
    textAlign: "center",
  },
});
