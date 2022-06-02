import { product } from "src/model/product";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ToastAndroid,
  StyleSheet,
  ScrollView,
  View
} from "react-native";
import Product from "src/components/atoms/Product";
import tss from "src/api/tss";
import { callApi } from "app/api/constant";

const ListProduct = () => {
  const [listProduct, setListProduct] = useState<product[]>([]);
  useEffect(() => {
    try {
      tss.get(callApi.product.getList).then((res) => {
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
  };
  return (
    <SafeAreaView>
      <ScrollView>
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
});
