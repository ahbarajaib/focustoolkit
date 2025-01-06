import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import * as WebBroswer from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'

import colors from '@/constants/Colors'

const webClientId = '424516773862-nqnmq8ai6rk7qqi53iuc1dc62ifs86n5.apps.googleusercontent.com'
const iosClientId = '424516773862-rild5noukdff9q68pje1oi59rcdbptok.apps.googleusercontent.com'
const androidClientId = '424516773862-e6cjd0e8ba41hc2tklijv7e99mpu5bpq.apps.googleusercontent.com'


WebBroswer.maybeCompleteAuthSession()

export default function LoginWithGoogle() {
    const config = {
        webClientId,
        iosClientId,
        androidClientId
    }
    const [request, response, promptAsync] = Google.useAuthRequest(config)

    const handleToken = () => {
        if (response?.type === 'success') {
            const { authentication } = response;
            const token = authentication?.accessToken;
            console.log('Access token', token)
        }
    }

    useEffect(() => {

    }, [response])

    return (
        <View>
            <TouchableOpacity style={styles?.buttonGoogle} onPress={() => promptAsync()}>
                <Image
                    source={require("@/assets/images/google_logo.png")}
                    style={{ width: 24, height: 24, marginRight: 10 }}
                />
                <Text
                    style={{
                        fontSize: 20,
                        color: colors?.PRIMARY1,
                    }}
                >
                    Sign in with Google
                </Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    buttonGoogle: {
        padding: 15,
        backgroundColor: colors?.WHITE,
        borderRadius: 15,
        marginTop: 20,
        borderWidth: 1,
        borderColor: colors?.PRIMARY1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
})