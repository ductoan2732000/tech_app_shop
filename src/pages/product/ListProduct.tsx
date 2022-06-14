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
  TextInput,
} from "react-native";
import Product from "src/components/atoms/Product";
import tss from "src/api/tss";
import { callApi } from "app/api/constant";
import ImageSelect from "app/components/atoms/ImageSelect";
import { productImage } from "app/common/function/commonFunction";

const ListProduct = () => {
  const [listProduct, setListProduct] = useState<product[]>([]);
  const [modeForm, setModeForm] = useState("view");
  const [productForm, setProductForm] = useState<product>({
    id: NaN,
    images: "https://reactnative.dev/img/tiny_logo.png",
    price: NaN,
    description: "",
    name: "",
    number_of_likes: 0,
    rate: 0,
    stock: NaN,
    flash_sale_time: "",
    flash_sale_percent: 0,
    number_of_rate: 0,
    id_shop: NaN,
  });
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
  const setImage = () => {
    setProductForm({
      ...productForm,
      images: productImage(productForm.id),
    });
  };
  const onChangeName = (val: string) => {
    setProductForm({
      ...productForm,
      name: val,
    });
  };
  const onChangeDes = (val: string) => {
    setProductForm({
      ...productForm,
      description: val,
    });
  };
  const onChangeStock = (val: string) => {
    let valSet = 0;
    if(!isNaN(parseInt(val))){
      valSet = parseInt(val)
    }
    setProductForm({
      ...productForm,
      stock: valSet,
    });
  };
  const onChangePrice = (val: string) => {
    let valSet = 0;
    if (!isNaN(parseInt(val))) {
      valSet = parseInt(val);
    }
    setProductForm({
      ...productForm,
      price: valSet,
    });
  };
  const onChangeFlasPer = (val: string) => {
    let valSet = 0;
    if (!isNaN(parseInt(val))) {
      valSet = parseInt(val);
    }
    if(valSet > 100){
      valSet = 100
    }
    setProductForm({
      ...productForm,
      flash_sale_percent: valSet,
    });
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
          // form create
          <ScrollView>
            <View style={styles.areaInfo}>
              <ImageSelect
                avatar={productForm.images}
                style={styles.dsdddsds}
                userId={productForm.id}
                setImageBase={setImage}
              />

              <View style={styles.labelInput}>
                <Text>Name</Text>
              </View>
              <TextInput
                style={styles.input}
                onChangeText={(newText) => onChangeName(newText)}
                placeholder="Full name"
                value={productForm.name}
              />
              <View style={styles.labelInput}>
                <Text>Description</Text>
              </View>
              <TextInput
                style={styles.input}
                onChangeText={(newText) => onChangeDes(newText)}
                placeholder="Description"
                value={productForm.description}
                multiline={true}
              />
              <View style={styles.labelInput}>
                <Text>Stock</Text>
              </View>
              <TextInput
                style={styles.input}
                onChangeText={(newText) => onChangeStock(newText)}
                placeholder="Stock"
                value={
                  isNaN(productForm.stock) ? "" : productForm.stock.toString()
                }
              />
              <View style={styles.labelInput}>
                <Text>Price</Text>
              </View>
              <TextInput
                style={styles.input}
                onChangeText={(newText) => onChangePrice(newText)}
                placeholder="price"
                value={
                  isNaN(productForm.price) ? "" : productForm.price.toString()
                }
              />
              <View style={styles.labelInput}>
                <Text>Flash Sale Percent</Text>
              </View>
              <TextInput
                style={styles.input}
                onChangeText={(newText) => onChangeFlasPer(newText)}
                placeholder="Flash Sale Percent"
                value={
                  isNaN(productForm.flash_sale_percent)
                    ? ""
                    : productForm.flash_sale_percent.toString() + "%"
                }
              />
            </View>
          </ScrollView>
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
  dsdddsds: {
    width: 130,
    height: 130,
    borderRadius: 10,
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
});
