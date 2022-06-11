import React, { useEffect, useState } from "react";
import { Button, Image, View, ActivityIndicator, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Firebase from "firebase";

let app: Firebase.app.App;
if (!Firebase.apps.length) {
  app = Firebase.initializeApp({
    apiKey: "AIzaSyCwT_qfZ_3yEitTzOP3nrZW3CAEiiDpHvo",
    authDomain: "techapp-ad995.firebaseapp.com",
    projectId: "techapp-ad995",
    storageBucket: "techapp-ad995.appspot.com",
    messagingSenderId: "826332030942",
    appId: "1:826332030942:web:fc3fe809491bd8bb8f5f4f",
    measurementId: "G-FGPNQQSPB8",
  });
} else {
  app = Firebase.app();
}

export default function ImageSelect({
  avatar,
  style,
  userId,
  setImageBase,
}: {
  avatar: any;
  style: any;
  userId: any;
  setImageBase: Function;
}) {
  const [image, setImage] = useState(avatar);
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    console.log("mounted")
  }, [1])
  const pickImage = async () => {
    setUploading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      uploadImage(result.uri)
        .then(() => {
          Alert.alert("Upload thành công!");
          setUploading(false);
          setImageBase();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const uploadImage = async (uri: any) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = app
      .storage()
      .ref()
      .child("image" + "/" + "avatar" + userId);
    return ref.put(blob);
  };

  return (
    <View>
      <Image source={{ uri: image }} style={style} />
      {uploading ?? <ActivityIndicator size="large" color="#000" />}
      <Button title="Pick" onPress={pickImage} />
    </View>
  );
}
