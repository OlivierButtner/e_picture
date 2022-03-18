import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {ScrollView, StyleSheet, Text, View, Dimensions,} from "react-native";
import Login from "../components/login";
import Logout from "../components/logout";
import GetToken from "../components/getToken";
import axios from "axios";
import OtherDisplay from "../components/aboutDisplay/OtherDisplay";

const width = Dimensions.get("window").width; //full width

const UserScreen = ({ navigation }) => {
  const [token, setToken] = useState();
  const [myPictures, setMyPictures] = useState([]);
  const [myFavorites, setMyFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tableauImages, setTableauImages] = useState([]);

  const onMyImages = () => {
    console.log("click");
    setTableauImages(myPictures);
  };
  const onMyFavorites = () => {
    console.log("clock");
    setTableauImages(myFavorites);
  };
  useFocusEffect(
   useCallback(() => {
      const fetchToken = async () => {
        try {
          const jeton = await GetToken();
          if (jeton) {
            setToken(jeton);
            setIsLoading(true);
          } else {
            setIsLoading(false);
            setTableauImages([]);
          }
        } catch (e) {
          // Handle error
        }
      };

      fetchToken();
    }, [])
  );
  useEffect(async () => {
    if (token != null) {
    await axios({
      method: "GET",
      url: `https://api.imgur.com/3/account/me/images`,
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => {
        if (response.data.errors) {
          console.log("Data not found, please check in few minutes");
        } else {
          setMyPictures(response.data.data);
          console.log("my picture : ", myPictures)

        }
      })
      .catch((err) => {
        console.log("error my images: ", err);
      });
    await axios({
      method: "GET",
      url: `https://api.imgur.com/3/account/me/favorites`,
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => {
        if (response.data.errors) {
          console.log("Data not found, please check in few minutes");
        } else {
          setMyFavorites(response.data.data);
        }
        setIsLoading(true);
      })
      .catch((err) => {
        console.log("error my favorites: ", err);
      });
  }}, []);

  return (
    <View style={styles.container}>
      <View style={styles.bandeau}>
        <Login navigation={navigation} />
        <Logout navigation={navigation} />
      </View>
      <View style={styles.bandeau}>

        <Text style={styles.text} onPress={() => { onMyImages(); }}>My Images</Text>
        <Text style={styles.text} onPress={() => {onMyFavorites();}}>My favorites</Text>

      </View>
      {isLoading ? (
        <ScrollView>
          {tableauImages.map((image) => {
            return (
              <View key={image.id}><OtherDisplay image={image} /></View>
            );
          })}
        </ScrollView>
      ) : (

        <View>
          <Text style={styles.textError}>
            You should have an account and be log in for viewing this page.
          </Text>
        </View>

      )}
    </View>
  );
};

export default UserScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#2A3239",
  },
  bandeau: {
    flexDirection: "row",

    justifyContent: "space-around",
    width: width,
    backgroundColor: "white",
    color: "#2A3239",
    height: 45,
  },

  text: {
    fontSize: 20,
    fontStyle: "italic",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  textError: {
    color: "white",
    fontSize: 40,
    textAlign: "center",
    marginTop: 30,
  },
});
