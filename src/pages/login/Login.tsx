import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";

const Login = () => {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("src/assets/welcome.jpg")}
        resizeMode="contain"
        style={styles.image}
      >
        <Image
          style={styles.userImage}
          source={require("src/assets/user.png")}
        />

        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          placeholder="Enter your email"
          value={email}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Enter your password"
        />
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
  },
  userImage: {
    width: 50,
    height: 50,
  },
  input: {
    height: 50,
    margin: 15,
    borderWidth: 2,
    borderColor: "green",
    backgroundColor: "gray",
    color: "white",
    padding: 10,
    borderRadius: 10,
  },
});

export default Login;
