import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddAlbumScreen({ navigation, route }) {
    const { onAdd } = route.params;
    const [title, setTitle] = useState("");
    const [synopsis, setSynopsis] = useState("");
    const [image, setImage] = useState("");
    const [rating, setRating] = useState("");
    const [reviews, setReviews] = useState("");

    const handleAddAlbum = async () => {
        if (title && synopsis && image && rating) {
            const newAlbum = {
                id: String(Math.random()),
                title,
                synopsis,
                image,
                rating: parseFloat(rating),
                reviews
            };

            try {
                const storedAlbums = await AsyncStorage.getItem('albums');
                const albums = storedAlbums ? JSON.parse(storedAlbums) : [];
                albums.push(newAlbum);
                await AsyncStorage.setItem('albums', JSON.stringify(albums));
                
                onAdd(newAlbum);
                navigation.goBack();
            } catch (error) {
                console.error("Error al guardar el álbum en AsyncStorage", error);
            }
        } else {
            alert("Por favor, complete todos los campos.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Agregar Nueva Película</Text>
            <TextInput
                style={styles.input}
                placeholder="Título"
                placeholderTextColor="#aaa"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={[styles.input, styles.multiline]}
                placeholder="Sinopsis"
                placeholderTextColor="#aaa"
                value={synopsis}
                onChangeText={setSynopsis}
                multiline
            />
            <TextInput
                style={styles.input}
                placeholder="Imagen URL"
                placeholderTextColor="#aaa"
                value={image}
                onChangeText={setImage}
            />
            <TextInput
                style={styles.input}
                placeholder="Calificación (0-10)"
                placeholderTextColor="#aaa"
                value={rating}
                onChangeText={setRating}
                keyboardType="numeric"
            />
            <TextInput
                style={[styles.input, styles.multiline]}
                placeholder="Reseñas"
                placeholderTextColor="#aaa"
                value={reviews}
                onChangeText={setReviews}
                multiline
            />
            <TouchableOpacity style={styles.button} onPress={handleAddAlbum}>
                <Text style={styles.buttonText}>Guardar Película</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#000',
        padding: 20,
        alignItems: 'center',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffcc00',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#1E1E1E',
        borderRadius: 10,
        paddingLeft: 15,
        color: '#fff',
        marginBottom: 15,
        fontSize: 16,
    },
    multiline: {
        height: 80,
        textAlignVertical: 'top',
        paddingTop: 10,
    },
    button: {
        width: '100%',
        backgroundColor: '#ffcc00',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
