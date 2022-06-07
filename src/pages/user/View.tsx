import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { user } from "src/model/user";
import { Text, View, StyleSheet, Image, ToastAndroid } from "react-native";
const ViewProfile = (props: any) => {
  const [user, setUser] = useState<user>({
    id: NaN,
    password: "",
    avatar: "",
    full_name: "",
    phone: "",
    birthday: "",
    gender: NaN,
    email: "",
    user_name: "",
    main_address: "",
  } as user);
  useEffect(() => {
    try {
      AsyncStorage.getItem("@user").then((res: any) => {
        const data: user = JSON.parse(res);
        setUser(data);
      });
      
    } catch (error : any) {
      ToastAndroid.showWithGravityAndOffset(
        error.toString(),
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
  }, []);

  return (
    <View style={styles.contain}>
      <View style={styles.areaImage}>
        <Image style={styles.avatar} source={{ uri: user.avatar }} />
      </View>
      <View style={styles.areaInfo}>
        <Text>tsd</Text>
      </View>
    </View>
  );
};
export default ViewProfile;
const styles = StyleSheet.create({
  contain: {
    flex: 1
  },
  areaImage: {
    flex: 2,
  },
  avatar: {
    width: 30,
    height: 30
  },
  areaInfo: {
    flex: 5,
  },
});
