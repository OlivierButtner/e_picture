import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import GetToken from "../components/getToken";
import axios from "axios";
import DisplayPicture from "../components/aboutDisplay/DisplayPicture";
import OtherDisplay from "../components/aboutDisplay/OtherDisplay";

const FindScreen = () => {
  const [token, setToken] = useState();
  const [input, onInput] = useState();
  const [result, setResult] = useState();
  const [elements, setElements] = useState([]);
  const [isLoading, setIsLoading] = useState();

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
            setElements([]);
          }
        } catch (e) {
          // Handle error
        }
      };

      fetchToken();
    }, [])
  );

  const search = async (e) => {
    setResult(input);
    await axios({
      method: "GET",
      url: "https://api.imgur.com/3/gallery/search/?q=" + result,
      headers: { Authorization: "Bearer " + token },
    })
      .then((response) => {
        if (response.data.errors) {
          console.log("Data not found, please check in few minutes");
        } else {
          setElements(response.data.data);
        }
        setIsLoading(true);
      })
      .catch((err) => {
        console.log("error : ", err);
      });

    onInput();
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={input}
        placeholder="What's new ?"
        onChangeText={onInput}
        placeholderTextColor={"white"}
      />

      <Pressable style={styles.button} onPress={search}>
        <Text style={styles.textButton}>Search</Text>
      </Pressable>

      <ScrollView style={styles.scrollView}>
        {isLoading ? (
          elements.map((image) => (
            <View key={image.id}>
              <OtherDisplay image={image} />
            </View>
          ))
        ) : (
          <Text style={styles.textError}>
            You should have an account and be log in to perform a search.
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default FindScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#2A3239",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "white",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "white",
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#2A3239",
  },
  textError: {
    color: "white",
    fontSize: 40,
    textAlign: "center",
    marginTop: 30,
  },
});
