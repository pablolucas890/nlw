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
import { useNavigation, useRoute } from "@react-navigation/native";

interface Params{
    title: string;
    subtitle: string;
    buttonTitle: string;
    icon: 'smile' | 'hug'
    nextScreen: string;
}

const emojis = {
    hug : '🤗',
    smile : '😀'
}
export function Confirmation( ) {

    const navigation = useNavigation();
    const routes = useRoute();

    const { title, subtitle, buttonTitle, icon, nextScreen} = routes.params as Params;
    function handleMoveOn() {
        navigation.navigate(nextScreen)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                        {emojis[icon]}
                </Text>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.text}>
                    {subtitle}
                </Text>
                <View style={styles.footer}>
                    <Button title={buttonTitle} onPress={handleMoveOn}/>
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