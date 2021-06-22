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
import { useNavigation } from '@react-navigation/native';

export function SingIn() {

	const navigation = useNavigation();

	function handleSingIn() {
		navigation.navigate('Home');
	}

	return (
		<View style={styles.container}>
			<Image source={illustrationIMG} style={styles.image} />
			<View style={styles.content}>

				<Text style={styles.title}>
					Conecte-se {'\n'}
					e organize suas{'\n'}
					jogatinas
				</Text>

				<Text style={styles.subTitle}>
					Crie grupos para jogar seus games {'\n'}
					favoritos com seus amigos
				</Text>

				<ButtonIcon
					title="Entrar com Discord"
					activeOpacity={0.3}
					onPress={handleSingIn}
				/>

			</View>
		</View>
	);
}
