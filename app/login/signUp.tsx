import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  ToastAndroid,
  Alert
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";

import LoginWithGoogle from "@/components/LoginWithGoogle";
import colors from "@/constants/Colors";



export default function SignUp() {

  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const handleSubmit = async () => {
    if (!fullName || !email || !password) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Fill are required fields', ToastAndroid.SHORT)
      } else {
        Alert.alert('Fill all required fields')
      }
      return
    }
    const userData = {
      name: fullName,
      email,
      password,
    };
    await axios
      .post("http://localhost:6001/api/auth/register", userData)
      .then((res) => {
        console.log(res.data);

        router.push("/login/signIn");
        if (Platform.OS === 'android') {
          ToastAndroid.show('Registration successful', ToastAndroid.SHORT);
        } else {
          Alert.alert('Registration successful', 'You can now login with your new account.')
        }
      })
      .catch((e) => {
        if (Platform.OS === 'android') {
          ToastAndroid.show(e.reponse?.data?.message || 'An error occurred, Please try again', ToastAndroid.SHORT);
        } else {
          Alert.alert('Registration failed', e.response?.data?.message || 'An error occurred, Please try again.')
        }
      });
  };

  return (
    <View style={{ padding: 25, marginTop: 32 }}>
      <Text style={styles.textHeader}>Create New Account</Text>

      <View style={{ marginTop: 25 }}>
        <Text>Full Name</Text>
        <TextInput
          placeholder="Full Name"
          style={styles.textInput}
          value={fullName}
          onChangeText={setFullName}
        />
      </View>
      <View style={{ marginTop: 25 }}>
        <Text>Email</Text>
        <TextInput
          placeholder="Email"
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={{ marginTop: 25 }}>
        <Text>Password</Text>
        <TextInput
          placeholder="Password"
          style={styles.textInput}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
      </View>
      <TouchableOpacity style={styles?.button} onPress={handleSubmit}>
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            color: colors?.WHITE,
          }}
        >
          Create Account
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles?.buttonSignIn}
        onPress={() => router.push("/login/signIn")}
      >
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            color: colors?.PRIMARY1,
          }}
        >
          Already have an account? Sign In
        </Text>
      </TouchableOpacity>
      <LoginWithGoogle />
    </View>
  );
}

const styles = StyleSheet.create({
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
  textInput: {
    padding: 10,
    borderWidth: 1,
    fontSize: 17,
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: colors?.WHITE,
  },
  button: {
    padding: 15,
    backgroundColor: colors?.PRIMARY1,
    marginTop: 25,
    borderRadius: 15,
  },
  buttonSignIn: {
    padding: 15,
    backgroundColor: colors?.WHITE,
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors?.PRIMARY1,
  },

});
