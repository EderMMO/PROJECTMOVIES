import React from "react";
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";

export default function AlbumDetailScreen({ route, navigation }) {
    const { album } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Image source={{ uri: album.image }} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{album.title}</Text>
                    <Text style={styles.category}>{album.category}  {album.year}</Text>
                    <Text style={styles.synopsis}>{album.synopsis}</Text>
                    <Text style={styles.rating}>Calificación: {album.rating}</Text>
                    <Text style={styles.reviews}>Reseñas: {album.reviews || "Sin reseñas aún"}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonText}>Regresar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Reviews', { album })}>
                        <Text style={styles.buttonText}>Ver Reseñas</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    image: {
        width: '100%',
        height: 500,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        resizeMode: 'cover',
    },
    textContainer: {
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#ffcc00',
        textAlign: 'center',
        marginBottom: 5,
    },
    category: {
        fontSize: 16,
        color: '#bbb',
        textAlign: 'center',
        marginBottom: 10,
    },
    synopsis: {
        fontSize: 16,
        color: '#ddd',
        marginBottom: 20,
        lineHeight: 22,
        textAlign: 'justify',
    },
    rating: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffcc00',
        textAlign: 'center',
    },
    reviews: {
        fontSize: 16,
        color: '#ccc',
        fontStyle: 'italic',
        marginTop: 10,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
    },
    button: {
        backgroundColor: '#ffcc00',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
});