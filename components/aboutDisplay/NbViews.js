import React from "react";
import { Text, StyleSheet } from "react-native";

const NbOfViews = (props) => {
  const image = props.image;

  return <Text style={styles.text}>Number of views : {image.views}</Text>;
};
export default NbOfViews;

const styles = StyleSheet.create({
  text: {
    color: "yellow",
    fontSize: 18,
  },
});
