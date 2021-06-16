import React from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text
} from 'react-native';
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { Button } from "../components/ButtonTextGreem";

export function Confirmation() {


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                        😀
                </Text>
                <Text style={styles.title}>
                        Prontinho
                </Text>
                <Text style={styles.text}>
                    Vamos começar a cuidar das suas {'\n'}
                    plantinhas com muito cuidado
                </Text>
                <View style={styles.footer}>
                    <Button title="Confirmar"/>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        padding: 30
    },
    emoji: {
        fontSize: 78,
        textAlign: 'center',
    },
    title:{
        fontSize: 22,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 38,
        marginTop: 15
    },
    text:{
        fontSize: 17,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.text,
        paddingVertical: 10,
        
    },
    footer:{
        width: '100%',
        paddingHorizontal: 40,
        marginTop: 20
    }
})