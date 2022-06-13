import { product } from "src/model/product";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ToastAndroid,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import Product from "src/components/atoms/Product";
import tss from "src/api/tss";
import { callApi } from "app/api/constant";

const ListProduct = () => {
  const [listProduct, setListProduct] = useState<product[]>([]);
  const [modeForm, setModeForm] = useState("view");
  useEffect(() => {
    try {
      tss.get(callApi.product.getListById).then((res) => {
        setListProduct(res.data.data);
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
  const clickProduct = (value: any) => {
    console.log(value);
    setModeForm("update");
  };
  const createProductFromView = () => {
    setModeForm("create");
  };
  const createProduct = () => {
    console.log("create");
  };
  return (
    <SafeAreaView>
      <ScrollView>
        {modeForm === "view" ? (
          <View style={styles.listProduct}>
            {listProduct.map((item) => {
              return (
                <Product
                  data={item}
                  key={item.id}
                  clickProduct={clickProduct}
                ></Product>
              );
            })}
          </View>
        ) : modeForm === "update" ? (
          <Text>toana</Text>
        ) : (
          <Text>toanm</Text>
        )}
        <View style={styles.areaInfo}>
          <View style={styles.footer}>
            {modeForm === "view" ? (
              <TouchableOpacity
                disabled={false}
                activeOpacity={1}
                style={styles.footerButtonUpdateFormView}
                onPress={createProductFromView}
              >
                <Text>Create Product</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                disabled={false}
                activeOpacity={1}
                style={styles.footerButtonUpdate}
                onPress={createProduct}
              >
                <Text>OK</Text>
              </TouchableOpacity>
            )}
            {modeForm === "update" || modeForm === "create" ? (
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
    </SafeAreaView>
  );
};
export default ListProduct;
const styles = StyleSheet.create({
  listProduct: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  footer: {
    marginTop: 15,
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
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
});
