import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import { product } from "src/model/product";
interface propsProduct {
  image?: string;
  name?: string;
  price?: string;
  clickProduct: Function;
}
const Product = (props: propsProduct) => {
  const [productForm, setProductForm] = useState<product>({
    image: props.image ? props.image : "",
    name: props.name ? props.name : "",
    price: props.price ? props.price : "",
  });
  const clickProduct = () => {
    props.clickProduct(props);
  };
  const onChangeName = (e : string) => {
      setProductForm({
        ...productForm,
        name: e
      });
      console.log(productForm);
  };
  return (
    <View>
      <Text>{productForm.image}</Text>
      <TextInput
        style={styles.input}
        onChangeText={(newText) => onChangeName(newText)}
        value={productForm.name}
        placeholder="useless placeholder"
        editable={true}
      />
      <TouchableOpacity onPress={clickProduct}>
        <Image
          style={styles.iconProduct}
          source={require("src/assets/icon/profile.png")}
        />
      </TouchableOpacity>
    </View>
  );
};
export default Product;
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  iconProduct: {
    resizeMode: "contain",
  },
});
