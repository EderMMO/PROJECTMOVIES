import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreenMovie";
import AlbumDetailScreen from "../screens/DetailsScreenMovie";
import AddAlbumScreen from "../screens/AddMovieScreen";
import EditAlbumScreen from "../screens/EditMovieScreen";
import ReviewsScreen from "../screens/ReviewsScreen";

const Stack = createNativeStackNavigator();

export default function NavigationStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      {/* Auth Screens */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />

      {/* App Screens */}
      <Stack.Screen name="Albums" component={HomeScreen} />
      <Stack.Screen name="AlbumDetail" component={AlbumDetailScreen} />
      <Stack.Screen name="AddAlbum" component={AddAlbumScreen} />
      <Stack.Screen name="EditAlbum" component={EditAlbumScreen} />
      <Stack.Screen name="Reviews" component={ReviewsScreen} />
    </Stack.Navigator>
  );
}
