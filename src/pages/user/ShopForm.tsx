import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { shop } from "src/model/shop";
import { user } from "src/model/user";
import tss from "app/api/tss";
import { callApi } from "app/api/constant";
const ShopForm = () => {
  const [is_shop, setIdShop] = useState(-1);
  const [modeForm, setModeForm] = useState("view");
  const [shop, setShop] = useState<shop>({
    id: NaN,
    shop_name: "",
    description: "",
    rate: NaN,
    number_of_rate: NaN,
    main_address: "",
  } as shop);
  const updateUserFormView = () => {
    setModeForm("update");
  };
  const updateUser = async () => {
    try {
      const res = await tss.put(callApi.shop.update, shop);
      setModeForm("view");
    } catch (error: any) {
      ToastAndroid.showWithGravityAndOffset(
        error.response.data.data,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
  };
  useEffect(() => {
    AsyncStorage.getItem("@user").then(async (res: any) => {
      const data: user = JSON.parse(res);
      setIdShop(data.id_shop);
      const idCallApi = data.id_shop;
      if (idCallApi !== -1) {
        try {
          const url = callApi.shop.getShopById.replace(
            "{{id_shop}}",
            idCallApi.toString()
          );
          const res = await tss.get(url);
          setShop(res.data.data);
        } catch (error: any) {
          ToastAndroid.showWithGravityAndOffset(
            error.response.data.data,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );
        }
      }
    });
  }, []);
  const onChangeName = (newVal: string) => {
    setShop({
      ...shop,
      shop_name: newVal,
    });
  };
  const onChangeDes = (newVal: string) => {
    setShop({
      ...shop,
      description: newVal,
    });
  };
  const onChangeAddress = (newVal: string) => {
    setShop({
      ...shop,
      main_address: newVal,
    });
  };
  return (
    <ScrollView>
      <View style={styles.areaInfo}>
        <Text style={styles.textInfo}>Shop Information</Text>
        <View style={styles.rateInfo}>
          <Image
            style={styles.iconHeard}
            source={require("src/assets/icon/star.png")}
          />
          <Text style={{ marginLeft: 5 }}>
            {Math.round(shop.rate * 10) / 10}
          </Text>
        </View>
        <Text>(number of user reviews: {shop.number_of_rate})</Text>
        <View style={styles.labelInput}>
          <Text>Full Name</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={(newText) => onChangeName(newText)}
          placeholder="Name of Shop"
          value={shop.shop_name}
          editable={modeForm === "view" ? false : true}
        />
        <View style={styles.labelInput}>
          <Text>Description</Text>
        </View>
        <TextInput
          style={styles.input}
          multiline={true}
          onChangeText={(newText) => onChangeDes(newText)}
          placeholder="Description of shop"
          value={shop.description}
          editable={modeForm === "view" ? false : true}
        />
        <View style={styles.labelInput}>
          <Text>Address Shop</Text>
        </View>
        <TextInput
          style={styles.input}
          multiline={true}
          onChangeText={(newText) => onChangeAddress(newText)}
          placeholder="Address Shop"
          value={shop.main_address}
          editable={modeForm === "view" ? false : true}
        />
        <View style={styles.footer}>
          {modeForm === "view" ? (
            <TouchableOpacity
              disabled={false}
              activeOpacity={1}
              style={styles.footerButtonUpdateFormView}
              onPress={updateUserFormView}
            >
              <Text>Update</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled={false}
              activeOpacity={1}
              style={styles.footerButtonUpdate}
              onPress={updateUser}
            >
              <Text>OK</Text>
            </TouchableOpacity>
          )}
          {modeForm === "update" ? (
            <TouchableOpacity
              style={styles.footerButtonCancel}
              onPress={() => {
                setModeForm("view");
              }}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
};
export default ShopForm;
const styles = StyleSheet.create({
  iconHeard: {
    width: 20,
    height: 20,
  },
  footerButtonCancel: {
    width: "45%",
    height: 50,
    backgroundColor: "red",
    marginLeft: 10,
    borderRadius: 10,
    borderWidth: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  footerButtonUpdateFormView: {
    width: "95%",
    height: 50,
    backgroundColor: "green",
    marginLeft: 10,
    borderRadius: 10,
    borderWidth: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  footerButtonUpdate: {
    width: "45%",
    height: 50,
    backgroundColor: "green",
    marginLeft: 10,
    borderRadius: 10,
    borderWidth: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  areaInfo: {
    justifyContent: "center",
    alignItems: "center",
  },
  textInfo: {
    fontSize: 25,
    marginTop: 10,
  },
  rateInfo: {
    flexDirection: "row",
  },
  labelInput: {
    width: "95%",
    justifyContent: "flex-start",
  },
  input: {
    height: 50,
    width: "95%",
    margin: 15,
    borderWidth: 2,
    borderColor: "#BAE0BD",
    backgroundColor: "gray",
    color: "white",
    padding: 10,
    borderRadius: 10,
  },
  footer: {
    marginTop: 15,
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
