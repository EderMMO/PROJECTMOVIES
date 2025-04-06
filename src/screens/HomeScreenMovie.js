import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
    const [albums, setAlbums] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [sortedAlbums, setSortedAlbums] = useState([]);

    useEffect(() => {
        const loadAlbums = async () => {
            try {
                const storedAlbums = await AsyncStorage.getItem('albums');
                if (storedAlbums) {
                    setAlbums(JSON.parse(storedAlbums));
                }
            } catch (error) {
                console.error("Error loading albums from AsyncStorage", error);
            }
        };
        loadAlbums();
    }, []);

    useEffect(() => {
        const saveAlbums = async () => {
            try {
                await AsyncStorage.setItem('albums', JSON.stringify(albums));
            } catch (error) {
                console.error("Error saving albums to AsyncStorage", error);
            }
        };
        saveAlbums();
    }, [albums]);

    useEffect(() => {
        const filteredAlbums = albums.filter((album) => {
            const lowerCaseSearchText = searchText.toLowerCase();
            return album.title.toLowerCase().includes(lowerCaseSearchText) || album.rating.toString().includes(lowerCaseSearchText);
        });
        setSortedAlbums(filteredAlbums);
    }, [searchText, albums]);

    const sortByRating = () => {
        const sorted = [...sortedAlbums].sort((a, b) => b.rating - a.rating);
        setSortedAlbums(sorted);
    };

    const sortByTitle = () => {
        const sorted = [...sortedAlbums].sort((a, b) => a.title.localeCompare(b.title));
        setSortedAlbums(sorted);
    };

    const deleteAlbum = async (id) => {
        const updatedAlbums = albums.filter((album) => album.id !== id);
        setAlbums(updatedAlbums);
    };

    const renderAlbum = ({ item }) => (
        <View style={styles.card}>
            <TouchableOpacity
                onPress={() => navigation.navigate('AlbumDetail', { album: item })}
            >
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('EditAlbum', { album: item, setAlbums })}
                >
                    <Text style={styles.buttonText}>EDITAR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteAlbum(item.id)}>
                    <Text style={styles.buttonText}>ELIMINAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={sortedAlbums}
                renderItem={renderAlbum}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                ListHeaderComponent={(
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>Mis Películas</Text>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Buscar por título o calificación..."
                            placeholderTextColor="#aaa"
                            value={searchText}
                            onChangeText={setSearchText}
                        />
                        <View style={styles.sortContainer}>
                            <TouchableOpacity style={styles.sortButton} onPress={sortByTitle}>
                                <Text style={styles.sortButtonText}>Ordenar A-Z</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.sortButton} onPress={sortByRating}>
                                <Text style={styles.sortButtonText}>Ordenar por Rating</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddAlbum', { onAdd: (newAlbum) => setAlbums(prev => [...prev, newAlbum]) })}>
                            <Text style={styles.addButtonText}>+ Agregar Película</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    headerContainer: {
        padding: 10,
        backgroundColor: '#000',
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ffcc00',
        textAlign: 'center',
        marginVertical: 15,
    },
    searchInput: {
        height: 40,
        backgroundColor: '#1E1E1E',
        borderRadius: 10,
        paddingLeft: 10,
        color: '#fff',
        marginBottom: 10,
    },
    sortContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    sortButton: {
        backgroundColor: '#444',
        padding: 10,
        borderRadius: 5
    },
    sortButtonText: {
        color: '#ffcc00',
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#ffcc00',
        padding: 15,
        borderRadius: 10,
        marginVertical: 15,
        alignItems: 'center'
    },
    addButtonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold'
    },
    card: {
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#1E1E1E',
        padding: 10
    },
    image: {
        width: '100%',
        height: 500,
        resizeMode: 'cover'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        paddingVertical: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    editButton: {
        backgroundColor: '#ffcc00',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 5
    },
    deleteButton: {
        backgroundColor: '#ff4444',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 5
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    listContainer: {
        paddingBottom: 10
    }
});
