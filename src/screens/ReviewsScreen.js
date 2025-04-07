import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Button, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AlbumDetailScreen({ route, navigation }) {
    const { album } = route.params;
    const [newReview, setNewReview] = useState("");
    const [reviews, setReviews] = useState([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const loadReviews = async () => {
            try {
                const savedReviews = await AsyncStorage.getItem(`reviews_${album.id}`);
                if (savedReviews) {
                    setReviews(JSON.parse(savedReviews));
                }
            } catch (error) {
                console.error("Error al cargar las reseñas", error);
            }
        };
        loadReviews();
    }, [album.id]);

    useEffect(() => {
        const saveReviews = async () => {
            try {
                await AsyncStorage.setItem(`reviews_${album.id}`, JSON.stringify(reviews));
            } catch (error) {
                console.error("Error al guardar las reseñas", error);
            }
        };
        saveReviews();
    }, [reviews, album.id]);

    const handleAddReview = () => {
        if (newReview.trim() && username.trim()) {
            const newReviewObj = {
                id: String(Math.random()),
                user: username.trim(),
                comment: newReview.trim(),
            };
            setReviews([...reviews, newReviewObj]);
            setNewReview("");
            setUsername("");
        } else {
            Alert.alert("Error", "Por favor, ingresa un nombre de usuario y una reseña.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Image source={{ uri: album.image }} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{album.title}</Text>
                    <Text style={styles.category}>{album.category} | {album.year}</Text>
                    <Text style={styles.synopsis}>{album.synopsis}</Text>
                    <Text style={styles.rating}>⭐ {album.rating.toFixed(1)}</Text>
                </View>

                <View style={styles.reviewsContainer}>
                    <Text style={styles.reviewsTitle}>Reseñas</Text>
                    {reviews.length === 0 ? (
                        <Text style={styles.noReviewsText}>No hay reseñas para este álbum aún.</Text>
                    ) : (
                        reviews.map((review) => (
                            <View key={review.id} style={styles.review}>
                                <Text style={styles.reviewUser}>{review.user}:</Text>
                                <Text style={styles.reviewComment}>{review.comment}</Text>
                            </View>
                        ))
                    )}
                </View>

                <View style={styles.addReviewContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Tu nombre..."
                        value={username}
                        onChangeText={setUsername}
                        placeholderTextColor="#888"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Escribe tu reseña..."
                        value={newReview}
                        onChangeText={setNewReview}
                        placeholderTextColor="#888"
                        multiline
                    />
                    <TouchableOpacity style={styles.addButton} onPress={handleAddReview}>
                        <Text style={styles.addButtonText}>Agregar Reseña</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonText}>Regresar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#121212' },
    image: { width: '100%', height: 350, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
    textContainer: { padding: 20 },
    title: { fontSize: 26, fontWeight: 'bold', color: '#fff' },
    category: { fontSize: 16, color: '#bbb', marginBottom: 10 },
    synopsis: { fontSize: 16, color: '#ddd', marginBottom: 20, lineHeight: 22 },
    rating: { fontSize: 18, fontWeight: 'bold', color: '#ffcc00' },
    reviewsContainer: { padding: 20 },
    reviewsTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
    review: { marginBottom: 10, padding: 10, backgroundColor: '#333', borderRadius: 8 },
    reviewUser: { fontSize: 16, fontWeight: 'bold', color: '#ffcc00' },
    reviewComment: { fontSize: 14, color: '#ccc' },
    noReviewsText: { color: '#bbb', fontStyle: 'italic' },
    addReviewContainer: { padding: 20 },
    input: { height: 40, borderColor: '#888', borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 10, color: '#fff', backgroundColor: '#222' },
    addButton: { backgroundColor: '#ffcc00', padding: 12, borderRadius: 10, alignItems: 'center', marginTop: 10 },
    addButtonText: { fontSize: 16, fontWeight: 'bold', color: '#1e1e1e' },
    buttonContainer: { alignItems: 'center', padding: 20 },
    button: { backgroundColor: '#444', padding: 12, borderRadius: 10, alignItems: 'center', width: '50%' },
    buttonText: { fontSize: 16, fontWeight: 'bold', color: '#ffcc00' },
});
