import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { product } from "src/model/product";
interface propsProduct {
  data: product;
  clickProduct: Function;
}
const Product = (props: propsProduct) => {
  const [productForm, setProductForm] = useState<product>({
    id: props.data.id,
    images: props.data.images,
    price: props.data.price,
    description: props.data.description,
    name: props.data.name,
    number_of_likes: props.data.number_of_likes,
    rate: props.data.rate ? Math.round(props.data.rate * 10) / 10 : 0,
    stock: props.data.stock,
    flash_sale_time: props.data.flash_sale_time,
    flash_sale_percent: props.data.flash_sale_percent,
    number_of_rate: props.data.number_of_rate,
  });
  const clickProduct = () => {
    props.clickProduct(props);
  };
  const onChangeName = (e: string) => {
    setProductForm({
      ...productForm,
      name: e,
    });
    console.log(productForm);
  };
  return (
    <View style={styles.product}>
      <TouchableOpacity onPress={clickProduct}>
        <Image
          style={styles.iconProduct}
          source={{ uri: productForm.images }}
        />
        <View style={styles.textProduct}>
          <Text style={styles.textProductShow}>{productForm.name}</Text>
        </View>
        <View style={styles.desProduct}>
          <View style={styles.desProductLeft}>
            <Image
              style={styles.iconHeard}
              source={require("src/assets/icon/heart_no_click.png")}
            />
            <Text style={styles.textHeard}>{productForm.number_of_likes}</Text>
          </View>
          <View style={styles.desProductLeft}>
            <Image
              style={styles.iconHeard}
              source={require("src/assets/icon/star.png")}
            />
            <Text style={styles.textHeard}>{productForm.rate}</Text>
          </View>
        </View>
        <View style={styles.desProduct}>
          <View style={styles.desProductLeft}>
            <Image
              style={styles.iconHeard}
              source={require("src/assets/icon/price.png")}
            />
            <Text style={styles.textPrice}>{productForm.price + "$"}</Text>
          </View>
          <View style={styles.desProductLeft}>
            <Image
              style={styles.iconHeard}
              source={require("src/assets/icon/discount.png")}
            />
            <Text style={styles.textDiscount}>
              {productForm.flash_sale_percent + "%"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      {/* <TextInput
        style={styles.input}
        onChangeText={(newText) => onChangeName(newText)}
        value={productForm.name}
        placeholder="placeholder"
        editable={true}
      /> */}
      {/* <TouchableOpacity onPress={clickProduct}>
        <Image
          style={styles.iconProduct}
          source={require("src/assets/icon/profile.png")}
        />
      </TouchableOpacity> */}
    </View>
  );
};
export default Product;
const styles = StyleSheet.create({
  // input: {
  //   height: 40,
  //   margin: 12,
  //   borderWidth: 1,
  //   padding: 10,
  // },
  product: {
    width: "42%",
    height: 250,
    borderRadius: 20,
    marginLeft: "5%",
    marginBottom: 15,
    borderColor: "#BAE0BD",
    borderWidth: 2,
    flexDirection: "column",
  },
  iconProduct: {
    width: "100%",
    height: 150,
    borderRadius: 20,
  },
  textProduct: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textProductShow: {
    fontSize: 15,
  },
  desProduct: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
    marginTop: 5,
  },
  desProductLeft: {
    display: "flex",
    flexDirection: "row",
    marginRight: 3,
    marginLeft: 3,
    alignItems: "center",
  },
  iconHeard: {
    width: 20,
    height: 20,
  },
  textHeard: {
    marginLeft: 5,
  },
  textPrice: {
    marginLeft: 5,
    fontSize: 17,
  },
  textDiscount: {
    marginLeft: 5,
    fontSize: 17,
  },
});
