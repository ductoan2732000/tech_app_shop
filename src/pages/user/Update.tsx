import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { user } from "src/model/user";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ToastAndroid,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
const genders = ["Male", "Female", "Other"];
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
    } catch (error: any) {
      ToastAndroid.showWithGravityAndOffset(
        error.toString(),
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
  }, []);
  const onChangeName = (newVal: string) => {
    setUser({
      ...user,
      full_name: newVal,
    });
  };
  const onChangePhone = (newVal: string) => {
    setUser({
      ...user,
      phone: newVal,
    });
  };
  const onChangeBirthday = (newVal: string) => {
    setUser({
      ...user,
      birthday: newVal,
    });
  };
  const onChangeGender = (newVal: number) => {
    setUser({
      ...user,
      gender: newVal,
    });
  };
  const onChangeMainAddress = (newVal: string) => {
    setUser({
      ...user,
      main_address: newVal,
    });
  };
  return (
    <ScrollView>
      <View style={styles.areaInfo}>
        <Image style={styles.avatar} source={{ uri: user.avatar }} />
        <Text>Email: {user.email}</Text>
        <Text>User Name: {user.user_name}</Text>
        <View style={styles.labelInput}>
          <Text>Full Name</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={(newText) => onChangeName(newText)}
          placeholder="Full name"
          value={user.full_name}
        />
        <View style={styles.labelInput}>
          <Text>Phone</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={(newText) => onChangePhone(newText)}
          placeholder="phone"
          value={user.phone}
        />
        <View style={styles.labelInput}>
          <Text>Birthday</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={(newText) => onChangeBirthday(newText)}
          placeholder="birthday"
          value={user.birthday}
        />
        <View style={styles.labelInput}>
          <Text>Gender</Text>
        </View>
        <SelectDropdown
          dropdownStyle={styles.selectBox}
          buttonStyle={styles.buttonStyle}
          defaultValueByIndex={user.gender - 1}
          buttonTextStyle={styles.buttonTextStyle}
          data={genders}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem);
            onChangeGender(index + 1);
          }}
          buttonTextAfterSelection={(selectedItem) => {
            return selectedItem;
          }}
          rowTextForSelection={(item) => {
            return item;
          }}
        />
        <View style={styles.labelInput}>
          <Text>Main Address</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={(newText) => onChangeMainAddress(newText)}
          placeholder="Main Address"
          value={user.main_address}
        />
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.footerButtonUpdate}
            onPress={() => console.log(3)}
          >
            <Text>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerButtonCancel}
            onPress={() => console.log(3)}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default ViewProfile;
const styles = StyleSheet.create({
  avatar: {
    width: 130,
    height: 130,
    borderWidth: 2,
    borderColor: "#BAE0BD",
    borderRadius: 10,
  },
  areaInfo: {
    justifyContent: "center",
    alignItems: "center",
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
  labelInput: {
    width: "95%",
    justifyContent: "flex-start",
  },
  buttonStyle: {
    width: "95%",
    backgroundColor: "gray",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#BAE0BD",
  },
  buttonTextStyle: {
    color: "white",
  },
  selectBox: {
    width: "95%",
  },
  footer: {
    marginTop: 15,
    width: "90%",
    flexDirection: "row",
    flexWrap: "wrap",
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
});
