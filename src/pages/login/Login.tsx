import React from "react";
import tss from "src/api/tss";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Login = ({ navigation }: { navigation: any }) => {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const onPress = async () => {
    try {
      const res = await tss.post("api/login", {
        email: email,
        password: password,
      });
      await AsyncStorage.setItem("@user", JSON.stringify(res.data.data));
      navigation.navigate("Navigate");
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
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("src/assets/icon/welcome.jpg")}
        resizeMode="contain"
        style={styles.image}
      >
        <View style={styles.labelInput}>
          <Text>Email</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          placeholder="Enter your email"
          value={email}
        />
        <View style={styles.labelInput}>
          <Text>Password</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Enter your password"
        />
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text>Sign in</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  labelInput: {
    width: "95%",
    justifyContent: "flex-start",
  },
  userRow: {
    position: "absolute",
  },
  userImage: {
    width: 18,
    height: 18,
    // position: "absolute",
    // top: 32,
    // left: 30,
    zIndex: 1,
  },

  input: {
    height: 50,
    width: "95%",
    margin: 15,
    borderWidth: 2,
    borderColor: "green",
    backgroundColor: "gray",
    color: "white",
    padding: 10,
    borderRadius: 10,
  },
  button: {
    padding: 15,
    marginTop: 10,
    backgroundColor: "green",
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});

export default Login;
