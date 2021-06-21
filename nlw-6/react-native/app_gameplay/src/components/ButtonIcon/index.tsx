import React, { } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import discordIMG from '../../assets/discord.png'
import { styles } from './styles';

export function ButtonIcon() {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.iconWrapper}>
                <Image 
                    source={discordIMG}
                    style={styles.icon}
                />
            </View>
            <Text style={styles.title}>
                Entrar com Discord
            </Text>
        </TouchableOpacity>
    );
}
