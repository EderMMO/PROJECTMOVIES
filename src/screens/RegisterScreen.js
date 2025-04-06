import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, ImageBackground, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterScreen({ navigation }) {
    const [username, setUsername] = useState("");  // Cambié 'email' a 'username'
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async () => {
        if (!username || !password || !confirmPassword) {
            Alert.alert("Error", "Completa todos los campos.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Las contraseñas no coinciden.");
            return;
        }

        try {
            const storedUsers = await AsyncStorage.getItem("users");
            const users = storedUsers ? JSON.parse(storedUsers) : [];

            const exists = users.some(u => u.username === username);  // Cambié 'email' a 'username'

            if (exists) {
                Alert.alert("Error", "El usuario ya está registrado.");
                return;
            }

            const newUser = { username, password };  // Cambié 'email' a 'username'
            users.push(newUser);
            await AsyncStorage.setItem("users", JSON.stringify(users));

            Alert.alert("¡Registro exitoso!", "Ahora puedes iniciar sesión.");
            navigation.navigate("Login");
        } catch (error) {
            console.error("Error al registrar usuario", error);
            Alert.alert("Error", "Algo salió mal.");
        }
    };

    return (
        <ImageBackground
            source={require("../images/Login and register.jpg")}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.overlay}>
                <Text style={styles.title}>Crear Cuenta</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Usuario"
                    placeholderTextColor="#ccc"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor="#ccc"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirmar Contraseña"
                    placeholderTextColor="#ccc"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#FFD700",
        textAlign: "center",
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#1e1e1e',
        borderColor: '#FFD700',
        borderWidth: 1,
        borderRadius: 10,
        color: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 15,
    },
    button: {
        backgroundColor: "#FFD700",
        padding: 14,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 15,
    },
    buttonText: {
        color: "#121212",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16,
    },
    link: {
        color: "#ccc",
        textAlign: "center",
        marginTop: 10,
    },
    linkAccent: {
        color: "#FFD700",
        fontWeight: "bold",
    },
});
