import React, { useState } from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { Button } from "../components/ButtonTextGreem";
import { useNavigation } from "@react-navigation/native";

export function UserIdentification() {

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setisFilled] = useState(false);
    const [name, setName] = useState<string>();

    function handleInputBlur() {
        setIsFocused(false);
        setisFilled(!!name);
    }

    function handleInputFocus() {
        setIsFocused(true);
    }

    function handleInputChange(value: string) {
        setisFilled(!!value);
        setName(value);
    }

    const navigation = useNavigation();

    function handleConfirmation() {
        navigation.navigate('Confirmation')
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.content}>
                    <View style={styles.form}>
                        <Text style={styles.emoji}>
                            😀
                        </Text>
                        <Text style={styles.text}>
                            Como podemos {'\n'}
                            chamar você?
                        </Text>
                        <TextInput
                            style={[
                                styles.input,
                                (isFocused || isFilled) && { borderColor: colors.green, borderBottomWidth: 2 }
                            ]}
                            placeholder="Digite um Nome"
                            onBlur={handleInputBlur}
                            onFocus={handleInputFocus}
                            onChangeText={handleInputChange}
                        />
                        <View style={styles.footer}>
                            <Button title="Confirmar" onPress={handleConfirmation} />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
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
        width: "100%"
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',
    },
    emoji: {
        fontSize: 44
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    text: {
        fontSize: 24,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 32,
        marginTop: 20
    },
    footer: {
        marginTop: 40,
        width: "100%",
        paddingHorizontal: 20
    }
})