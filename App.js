import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';

import {NavigationContainer} from '@react-navigation/native'
import NavigationMovie from './src/navigation/NavigationAlbum';


export default function App() {
  return (

    <NavigationContainer>
    <NavigationMovie/>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00008b',
    alignItems: 'center',
    justifyContent: 'center',

  },
})