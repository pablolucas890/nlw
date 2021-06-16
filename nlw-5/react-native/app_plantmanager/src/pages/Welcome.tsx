import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions
} from "react-native";
import { Button } from "../components/Button";
import wateringImg from '../assets/watering.png';
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { useNavigation } from "@react-navigation/native";

export function Welcome() {
    const navigation = useNavigation();

    function handleStart(){
        navigation.navigate('UserIdentification')
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.view}>
                <Text style={styles.title}>
                    Gerencie {'\n'}
                    suas plantas de {'\n'}
                    forma fácil
                </Text>

                <Image
                    source={wateringImg}
                    style={styles.image}
                    resizeMode="contain"
                />

                <Text style={styles.subTitle}>
                    Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar.
                </Text>

                <Button title="" onPress={handleStart}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38,
        fontFamily: fonts.heading,
        lineHeight: 34
    },
    subTitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        fontFamily: fonts.text,
        color: colors.heading
    },
    image: {
        height: Dimensions.get('window').width * 0.7
    }
});