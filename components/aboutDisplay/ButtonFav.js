import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";


const ButtonFav = (props) => {

        const image = props.image;

        const [fav, setFav] = useState(props.image.favorite ? "Remove from favorites" : "add to favorites") ;
        const  [favStatus , setFavStatus] = useState(props.image.favorite)

        const HandleFav = async () => {
            const token = await SecureStore.getItemAsync("secure_token");
            console.log("token :", token)
            console.log("image.cover :", image.cover)
            const res = await axios({
                method: "POST",
                url: `https://api.imgur.com/3/image/${image.cover}/favorite`,
                headers: {Authorization: "Bearer " + token},
            });
            try {

                if (token != null) {
                    console.log("props.image.favorite ", props.image.favorite)
                    if (!favStatus) {
                        console.log("Remove from favorites")
                        setFav("Remove from favorites");
                    } else {
                        console.log("add to favorites")
                        setFav("Add to favorites");
                    }
                    setFavStatus(!favStatus)
                } else {
                    alert("Please Login");
                }
            } catch (error) {
                console.log("error add fav : ", error);
            }
        };

        return (
            <View>
                <Text
                    style={styles.text}
                    type="button"
                    onPress={() => {
                        HandleFav()
                    }}>
                    {fav}
                </Text>
            </View>
        );

};

export default ButtonFav;

const styles = StyleSheet.create({
    text: {
        color: "red",
        fontSize: 18,
    },
});
