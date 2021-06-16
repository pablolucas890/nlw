import React from "react";
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from "../styles/colors";
import { Feather } from '@expo/vector-icons'
import { TouchableOpacityProps } from "react-native";

interface ButtomProps extends TouchableOpacityProps{
    title: string;
}

export function Button({title, ...rest}: ButtomProps) {
    return (
        <TouchableOpacity style={styles.button} activeOpacity={0.3} {...rest}>
            <Feather 
                name="chevron-right"
                style={styles.buttonIcon}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56
    },
    buttonIcon: {
        color: colors.white,
        fontSize: 28,
    }
});