import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import DisplayPicture from "../components/aboutDisplay/DisplayPicture";
import axios from "axios";
import OtherDisplay from "../components/aboutDisplay/OtherDisplay";

const HomeScreen = () => {
  const [viralsArray, setViralsArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    await axios({
      method: "GET",
      url: `https://api.imgur.com/3/gallery/hot/viral/0.json`,
    })
      .then((response) => {
        if (response.data.errors) {
          console.log("Data not found, please check in few minutes");
        } else {
          setViralsArray(response.data.data);
        }
        setIsLoading(true);
      })
      .catch((err) => {
        console.log("error : ", err);
      });
  }, []);

  return (
    <View style={styles.container}>

      {isLoading ? (
        <ScrollView>
          {viralsArray.map((image) => {
            return (
              <View key={image.id}>
                {/*<DisplayPicture image={image} />*/}
                <OtherDisplay image={image} />
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <View>
          <Text>Is Loading ...</Text>
        </View>
      )}

    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 1000,
    flexDirection: "column",
    backgroundColor: "#2A3239",
  },
  myState: {
    marginTop: 0,
    textAlign: "left",
    color: "white",
    fontWeight: "bold",
    fontSize: 40,
  },
});
