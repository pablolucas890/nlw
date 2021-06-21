import React, { } from 'react';
import {
    Text,
    View,
    Image,
    StatusBar,
} from 'react-native';
import { styles } from './styles';
import illustrationIMG from '../../assets/illustration.png'
import { ButtonIcon } from '../../components/ButtonIcon';

export function SingIn() {
    return (
        <View style={styles.container}>
            <StatusBar barStyle='light-content' backgroundColor='transparent' translucent/>
            <Image source={illustrationIMG} style={styles.image} />
            <View style={styles.content}>

                <Text style={styles.title}>
                    Organize {'\n'}
                    suas jogatinas {'\n'}
                    facilmente
                </Text>

                <Text style={styles.subTitle}>
                    Crie grupos para jogar seus games {'\n'}
                    favoritos com seus amigos
                </Text>

                <ButtonIcon />

            </View>
        </View>
    );
}
