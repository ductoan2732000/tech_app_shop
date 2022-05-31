import { useEffect, useState } from "react";
import { Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { user } from "src/model/user";

const ListOrder = () => {
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
    AsyncStorage.getItem("@user").then((res: any) => {
      const data: user = JSON.parse(res);
      setUser(data);
    });
  }, []);
  return <Text>đsđâsdsa</Text>;
};
export default ListOrder;
