import * as SecureStore from "expo-secure-store";
import React, {useState, useEffect} from "react";
import {StyleSheet, Text, View, Image, PermissionsAndroid, Pressable, ScrollView, Platform} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";

export default function AddScreen() {
    const [image, setImage] = useState(null);
    const [ImageDisplay, setImageDisplay] = useState(null);
    const [token, setToken] = useState()

    useEffect(async () => {
        const jeton = await SecureStore.getItemAsync("secure_token");
        setToken(jeton)
    }, [])

    useEffect( () => {
        (async() => {
            if (Platform.OS === "ios"){
                const {status} = ImagePicker.requestCameraPermissionsAsync();
                if (status !== "granted") {
                    alert("Sorry, not granted")
                }
            }
        })();
    }, [])
    const pickImage = async () => {

                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                    base64: true
                });
                if (!result.cancelled) {
                    setImage(result.base64);
                    setImageDisplay(result.uri);
                }
            }

    const pickPhoto = async () => {

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });

        if (!result.cancelled) {
            setImage(result.base64);
            setImageDisplay(result.uri);
        }
    }
    const DeleteImage = async () => {
        let result = ("");
            alert("So sad! You canceled the post!")
    if (!result.cancelled) {
        setImage(result.base64);
        setImageDisplay(result.uri);
    }
}
    const UploadImage = async () => {

        await axios({
            method: 'POST',
            url: 'https://api.imgur.com/3/image',
            data: {
                image: image,
            },
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        });
        alert("Well posted!")
    }

    return (
        <View style={[styles.container, {}]}>

            <View style={{flex: 5, backgroundColor: "#2A3239"}}>
                <ScrollView>
                    {image&& <Image source={{uri: ImageDisplay}} style=
                        {{alignItems: 'center', width: 200, height: 200, marginLeft:100,marginBottom:10,}}/>}
                    <Pressable style={styles.button3} onPress={UploadImage}>
                        <Text style={styles.text}>+</Text>
                    </Pressable>
                    <Pressable style={styles.button3} onPress={DeleteImage}>
                        <Text style={styles.text}>Cancel</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={pickImage}>
                        <Text style={styles.text}>Add Photo Gallery</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={pickPhoto}>
                        <Image source={require('../assets/icons/takePicture.png')} resizeMode="contain"
                               style={{width: 50, height: 50}}/>
                    </Pressable>
                </ScrollView>
            </View>

        </View>
    );

};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 50,
        paddingHorizontal: 15,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: 'black',
        borderBottomColor: 'white',
        margin: 10,
    },
    button2: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 50,
        paddingHorizontal: 15,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#2A3241',
        borderBottomColor: 'white',
        margin: 10,
    },
    button3: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#2A3241',
        borderBottomColor: 'white',
        margin: 10,
    },
    text: {
        margin: 10,
        fontSize: 20,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    Image: {
        margin: 5,
    },
});
