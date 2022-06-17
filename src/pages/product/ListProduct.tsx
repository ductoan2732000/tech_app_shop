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
  AsyncStorage,
} from "react-native";
import Product from "src/components/atoms/Product";
import tss from "src/api/tss";
import { callApi } from "app/api/constant";
import ImageSelect from "app/components/atoms/ImageSelect";
import { productImage } from "app/common/function/commonFunction";
import { user } from "app/model/user";
import DateTimePicker from "@react-native-community/datetimepicker";
const ListProduct = () => {
  const [listProduct, setListProduct] = useState<product[]>([]);
  const [modeForm, setModeForm] = useState("view");
  const [idShop, setIdShop] = useState(-1);
  const [key, setKey] = useState(1);
  const [show, setShow] = useState(false);
  const [productForm, setProductForm] = useState<product>({
    id: -1,
    images: "https://reactnative.dev/img/tiny_logo.png",
    price: NaN,
    description: "",
    name: "",
    number_of_likes: 0,
    rate: 0,
    stock: NaN,
    flash_sale_time: new Date(),
    flash_sale_percent: 0,
    number_of_rate: 0,
    id_shop: -1,
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
  }, [key]);
  const onChangeFlashTime = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setProductForm({
      ...productForm,
      flash_sale_time: selectedDate,
    });
  };
  const showDatepicker = () => {
    setShow(true);
  };
  const clickProduct = (value: any) => {
    console.log(value);
    setModeForm("update");
  };
  const createProductFromView = () => {
    setModeForm("create");
  };
  const createProduct = async () => {
    const dataCreate = {
      ...productForm,
      id_shop: idShop,
    };
    if (validate(dataCreate)) {
      const res = await tss.post(callApi.product.createProduct, dataCreate);
      console.log(res.data.data);
      setModeForm("view");
      setKey(key + 1);
    } else {
      ToastAndroid.showWithGravityAndOffset(
        "Vui lòng nhập dữ liệu trên form hoàn tất",
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      );
    }
  };
  const validate = (productForm: product) => {
    let validate = true;
    if (!productForm.id || typeof productForm.id !== "number") {
      console.log("productForm.id");
      validate = false;
    }
    if (typeof productForm.number_of_likes !== "number") {
      console.log("productForm.number_of_likes");
      validate = false;
    }
    if (
      !productForm.flash_sale_percent ||
      typeof productForm.flash_sale_percent !== "number"
    ) {
      console.log("productForm.flash_sale_percent");
      validate = false;
    }
    if (typeof productForm.number_of_rate !== "number") {
      console.log("productForm.number_of_rate");
      validate = false;
    }
    if (typeof productForm.rate !== "number") {
      console.log("productForm.rate");
      validate = false;
    }
    if (!productForm.images) {
      console.log("productForm.images");
      validate = false;
    }
    if (!productForm.description) {
      console.log("productForm.description");
      validate = false;
    }
    if (!productForm.name) {
      console.log("productForm.name");
      validate = false;
    }
    if (isNaN(productForm.price)) {
      console.log(productForm.price);
      validate = false;
    }
    if (isNaN(productForm.stock)) {
      console.log("productForm.stock");
      validate = false;
    }
    if (!productForm.id_shop || productForm.id_shop === -1) {
      console.log("productForm.id_shop");
      validate = false;
    }
    return validate;
  };
  const getDataForm = (productForm: product) => {
    var bodyFormData = new FormData();
    bodyFormData.append("id", productForm.id.toString());
    bodyFormData.append("images", productForm.images);
    bodyFormData.append("price", productForm.price.toString());
    bodyFormData.append(
      "number_of_likes",
      productForm.number_of_likes.toString()
    );
    bodyFormData.append("rate", productForm.rate.toString());
    bodyFormData.append("stock", productForm.stock.toString());
    bodyFormData.append("description", productForm.description);
    bodyFormData.append("name", productForm.name);
    bodyFormData.append("flash_sale_time", "2022-06-21T13:32:50.230Z");
    bodyFormData.append(
      "flash_sale_percent",
      productForm.flash_sale_percent.toString()
    );
    bodyFormData.append(
      "number_of_rate",
      productForm.number_of_rate.toString()
    );
    bodyFormData.append("id_shop", idShop.toString());
    return bodyFormData;
  };
  const setImage = () => {
    setProductForm({
      ...productForm,
      images: productImage(idShop),
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
    if (!isNaN(parseInt(val))) {
      valSet = parseInt(val);
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
    if (valSet > 100) {
      valSet = 100;
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
              <TouchableOpacity
                disabled={false}
                activeOpacity={1}
                style={styles.inputDatePicker}
                onPress={showDatepicker}
              >
                <Text>
                  Flash Sale Time Begin:{" "}
                  {productForm.flash_sale_time.toLocaleDateString()}
                </Text>
              </TouchableOpacity>

              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={productForm.flash_sale_time}
                  mode="date"
                  is24Hour={true}
                  onChange={onChangeFlashTime}
                />
              )}
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
  inputDatePicker: {
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
