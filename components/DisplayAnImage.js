
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {

        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 600
    },
    logo: {
        width:180,
        height: 180,
        margin:5,
    },
});

const DisplayAnImage = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={{
                    uri: 'https://viago.ca/wp-content/uploads/2017/10/10-lacabraham-768x432.jpg',
                }}
            />
            <Image
                style={styles.logo}
                source={{
                    uri: 'https://archzine.fr/wp-content/uploads/2019/05/ac%CC%A7ores-portugal-le-plus-beau-pays-du-monde-paysage-magnifique-se%CC%81tonner-de-la-beaute%CC%81-de-la-terre.jpg',
                }}
            />
            <Image
                style={styles.logo}
                source={{
                    uri: 'https://highlevelcom.be/fr/wp-content/uploads/2020/10/shutterstock_1693011013.jpg',
                }}
            />
        </View>
    );
}

export default DisplayAnImage;
