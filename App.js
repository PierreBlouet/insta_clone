import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD986Gt5Yl8K6j4COro_YsMu5juEJ_uVnw",
  authDomain: "instagram-clone-fe25d.firebaseapp.com",
  projectId: "instagram-clone-fe25d",
  storageBucket: "instagram-clone-fe25d.appspot.com",
  messagingSenderId: "716535859285",
  appId: "1:716535859285:web:dc8e22c092151eaafc2cdc",
  measurementId: "G-MT68M2Z9BB",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }

  render() {
    const {loggedIn, loaded} = this.state
    if(!loaded){
      return(
        <View  style={{ flex: 1, justifyContent: "center" }}>
          <Text>Loading</Text>
        </View>
      )
    }

    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <View  style={{ flex: 1, justifyContent: "center" }}>
      <Text>Log In</Text>
    </View>
    );
    
  }
}

export default App;
