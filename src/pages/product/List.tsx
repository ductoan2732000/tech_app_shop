
import { product } from "src/model/product";
import React from "react";
import { FlatList, SafeAreaView } from "react-native";
import Product from "src/components/atoms/Product";

const listProduct : product[] = [
  {
    image: "anh1",
    name: "san pham1",
    price: "3",
  },
  {
    image: "anh2",
    name: "san pham3",
    price: "6",
  },
];
const ListProduct = () => {
  const clickProduct = (value: any) => {
    console.log(value);
  };
  const renderItem = ({ item }: { item: any }) => (
    <Product
      image={item.image}
      name={item.name}
      price={item.price}
      clickProduct={clickProduct}
    ></Product>
  );

  return (
    <SafeAreaView>
      <FlatList
        data={listProduct}
        renderItem={renderItem}
        keyExtractor={(item) => listProduct.indexOf(item).toString()}
      />
    </SafeAreaView>
  );
};
export default ListProduct;
