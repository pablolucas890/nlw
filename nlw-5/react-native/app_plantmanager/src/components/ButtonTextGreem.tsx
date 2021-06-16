import React from "react";
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';
import colors from "../styles/colors";
import { Feather } from '@expo/vector-icons'
import fonts from "../styles/fonts";

interface ButtomProps extends TouchableOpacityProps{
    title: string;
}

export function Button({title, ...rest}: ButtomProps) {
    return (
        <TouchableOpacity style={styles.button} activeOpacity={0.3} {...rest}>
            <Text style={styles.buttonText}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        height: 56,
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontFamily: fonts.heading

    }
});