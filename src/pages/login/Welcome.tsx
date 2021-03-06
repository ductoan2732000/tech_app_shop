import React from "react";

import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Welcome({ navigation }: { navigation: any }) {
  const onPress = () => {
    navigation.navigate("Login");
  };
  const onPressSignUp = () => {
    navigation.navigate("Navigate");
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("src/assets/icon/welcome.jpg")}
        resizeMode="contain"
        style={styles.image}
      >
        <Text style={styles.welcome}>Welcome!</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onPressSignUp}>
          <Text>Sign up</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  welcome: {
    fontSize: 35,
    color: "green",
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
