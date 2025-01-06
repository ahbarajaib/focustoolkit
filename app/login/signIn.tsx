import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  ToastAndroid,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";

import colors from "@/constants/Colors";
import { useAuth } from "@/context/AuthContext";
import LoginWithGoogle from "@/components/LoginWithGoogle";

export default function signin() {
  const router = useRouter();
  const { login } = useAuth()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading,setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Fill all required fields', ToastAndroid.SHORT);
      } else {
        Alert.alert('Fill all required fields');
      }
      return;
    }

    setIsLoading(true);
    try {
      const userData = { email, password };
      const response = await axios.post("http://192.168.1.223:6001/api/auth/login", userData);
      
      // First set the auth state
      await login(response.data.user, response.data.token);
      
      // Show success message
      if (Platform.OS === 'android') {
        ToastAndroid.show('Login Successful', ToastAndroid.SHORT);
      } else {
        Alert.alert('Login Successful', 'Welcome back!');
      }

      // Then navigate
      setTimeout(() => {
        router.replace('/(tabs)');
      }, 100);

    } catch (error: any) {
      console.error('Login error:', error);
      if (Platform.OS === 'android') {
        ToastAndroid.show(error.response?.data?.message || 'An error occurred', ToastAndroid.SHORT);
      } else {
        Alert.alert('Login failed', error.response?.data?.message || 'An error occurred. Please try again');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={{
        padding: 25,
        marginTop: 32,
      }}
    >
      <Text style={styles.textHeader}>Let's Sign You In</Text>
      <Text style={styles.subText}>Welcome Back!</Text>
      <Text style={styles.subText}>You've been missed!</Text>

      <View style={{ marginTop: 25 }}>
        <Text>Email</Text>
        <TextInput
          placeholder="Email"
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
          editable = {!isLoading}
        />
      </View>
      <View style={{ marginTop: 25 }}>
        <Text>Password</Text>
        <TextInput
          placeholder="Password"
          style={styles.textInput}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          editable={!isLoading}
        />
      </View>
      <TouchableOpacity 
        style={[styles.button, isLoading && styles.buttonDisabled]} 
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color={colors.WHITE} />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonCreate}
        onPress={() => router.push("/login/signUp")}
        disabled={isLoading}
      >
        <Text style={styles.buttonCreateText}>Create Account</Text>
      </TouchableOpacity>

      <LoginWithGoogle />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    marginTop: 32,
  },
  textHeader: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    color: colors.GRAY,
  },
  inputContainer: {
    marginTop: 25,
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    fontSize: 17,
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: colors.WHITE,
  },
  button: {
    padding: 15,
    backgroundColor: colors.PRIMARY1,
    borderRadius: 15,
    marginTop: 25,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    color: colors.WHITE,
  },
  buttonCreate: {
    padding: 15,
    backgroundColor: colors.WHITE,
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.PRIMARY1,
  },
  buttonCreateText: {
    textAlign: "center",
    fontSize: 20,
    color: colors.PRIMARY1,
  },
});