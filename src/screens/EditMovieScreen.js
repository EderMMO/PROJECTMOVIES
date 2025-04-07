import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, SafeAreaView, Alert, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditAlbumScreen({ route, navigation }) {
    const { album, setAlbums } = route.params;
    const [title, setTitle] = useState(album.title);
    const [synopsis, setSynopsis] = useState(album.synopsis || "");
    const [image, setImage] = useState(album.image);
    const [rating, setRating] = useState(album.rating.toString());
    const [reviews, setReviews] = useState(album.reviews || "");

    const editAlbum = async () => {
        if (!title || !image || !rating) {
            Alert.alert("Error", "Por favor, complete todos los campos obligatorios.");
            return;
        }

        const updatedAlbum = {
            ...album,
            title,
            synopsis,
            image,
            rating: parseFloat(rating),
            reviews,
        };

        try {
            const storedAlbums = await AsyncStorage.getItem('albums');
            const albums = storedAlbums ? JSON.parse(storedAlbums) : [];
            
            const updatedAlbums = albums.map(item => 
                item.id === album.id ? updatedAlbum : item
            );

            await AsyncStorage.setItem('albums', JSON.stringify(updatedAlbums));
            setAlbums(updatedAlbums);
            navigation.goBack();
        } catch (error) {
            console.error("Error al actualizar el álbum en AsyncStorage", error);
            Alert.alert("Error", "Hubo un problema al guardar el álbum.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.header}>Editar Álbum</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Título"
                    placeholderTextColor="#aaa"
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Sinopsis"
                    placeholderTextColor="#aaa"
                    value={synopsis}
                    onChangeText={setSynopsis}
                    multiline
                />
                <TextInput
                    style={styles.input}
                    placeholder="URL de la Imagen"
                    placeholderTextColor="#aaa"
                    value={image}
                    onChangeText={setImage}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Calificación"
                    placeholderTextColor="#aaa"
                    value={rating}
                    onChangeText={setRating}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Reseñas"
                    placeholderTextColor="#aaa"
                    value={reviews}
                    onChangeText={setReviews}
                    multiline
                />
                <TouchableOpacity style={styles.button} onPress={editAlbum}>
                    <Text style={styles.buttonText}>Guardar Cambios</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 20
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffcc00',
        textAlign: 'center',
        marginBottom: 20
    },
    input: {
        height: 50,
        backgroundColor: '#1E1E1E',
        color: '#fff',
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#ffcc00',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20
    },
    buttonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold'
    }
});
