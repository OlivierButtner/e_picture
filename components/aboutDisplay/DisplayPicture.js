import React from "react";
import {View, Text, Image, StyleSheet, Dimensions} from "react-native";
import NbViews from "./NbViews";
import ButtonFav from "./ButtonFav";
import {Video} from "expo-av";


const width = Dimensions.get("window").width; //full width
const height = Dimensions.get("window").height; //full height

const OtherDisplay = (props) => {
    const image = props.image;
    let url;
    const mediaType = props.image.type;

    const checkDisplay = (mediaType) => {
        if (!image.cover) {

            switch (props.image.type) {
                case 'image/png':
                    url = `https://i.imgur.com/${image.id}.png`;
                    return (
                        <Image style={styles.image} source={{url}}/>
                    );
                case 'image/jpeg':
                    url = `https://i.imgur.com/${image.id}.jpeg`;
                    return (
                        <Image style={styles.image} source={{url}}/>
                    )
                case 'image/gif':
                    url = `https://i.imgur.com/${image.id}.gif`;
                    return (
                        <Image style={styles.image} source={{url}}/>
                    );
                case 'video/mp4':
                    url = `https://i.imgur.com/${image.id}.mp4`;
                    return (
                        <Video source={{uri: url}}/>
                    );
            }
        } else {
            url = `${image.link}`;
            return (<Image style={styles.image} source={{uri: url,}}/>
            )
        }
    }
    return (
        <View style={styles.display}>
            {checkDisplay()}
            <Text style={styles.text}>{image.title}</Text>
            <NbViews image={image}/>
            <ButtonFav image={image}/>
        </View>
    );
};

export default OtherDisplay;

const styles = StyleSheet.create({
    image: {
        width: width,
        height: height / 2,
    },
    display: {
        width: width,
        height: height / 1.5,
        paddingVertical: 20,
    },
    text: {
        color: "white",
        fontSize: 18,
    },
});