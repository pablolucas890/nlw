import React, { useContext } from 'react';
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
import { BackGround } from '../../components/BackGround';
import { AuthContext } from '../../context/auth';

export function SingIn() {

	const navigation = useNavigation();
	const context = useContext(AuthContext);
	
	function handleSingIn() {
		navigation.navigate('Home');
	}

	return (
		<BackGround>
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
		</BackGround>
	);
}
