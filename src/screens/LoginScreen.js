import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, ImageBackground, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const user = users.find(u => u.username === username && u.password === password);  // Asegúrate de que 'username' coincida
      if (user) {
        Alert.alert('Bienvenido', `Hola ${username}`);
        navigation.replace('Albums'); // O la pantalla principal de tu app
      } else {
        Alert.alert('Error', 'Usuario o contraseña incorrectos');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo iniciar sesión');
    }
  };

  return (
    <ImageBackground
      source={require('../images/Login and register.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Bienvenido a TecFlix</Text>

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
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>
            ¿No tienes cuenta? <Text style={styles.linkAccent}>Regístrate</Text>
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 28,
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
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
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: '#121212',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  link: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: 10,
  },
  linkAccent: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
});
