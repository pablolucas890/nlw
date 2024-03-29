import React, { } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableOpacityProps
} from 'react-native';
import discordIMG from '../../assets/discord.png'
import { styles } from './styles';

interface Props extends TouchableOpacityProps {
    title: string;
}
export function ButtonIcon({ title, ...rest }: Props) {
    return (
        <TouchableOpacity
            style={styles.container}
            {...rest}
        >
            <View style={styles.iconWrapper}>
                <Image
                    source={discordIMG}
                    style={styles.icon}
                />
            </View>
            <Text style={styles.title}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}
